import {blogCollection, postCollection} from "../../../db/db";
import {ObjectId} from "mongodb";
import {QueryBlogModel, QueryPostByBlogIdInputModel} from "../types/query-blog-model";
import {BlogSortResponseType} from "../types/blog-sort-response-type";
import {BlogResponseType} from "../types/blog-response-type";
import {PostSortResponseType} from "../../post/types/post-sort-response-type";
import {postMapper} from "../../post/mappers/post-response-mapper";
import {blogMapper} from "../mappers/blog-response-mapper";

export class QueryBlogRepository {
    static async getAllEntities(sortData: QueryBlogModel): Promise<BlogSortResponseType> {
        const searchNameTerm = sortData.searchNameTerm ?? null
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        let filter = {}

        if (searchNameTerm) {
            filter = {
                name: {$regex: searchNameTerm,$options: 'i'}
            }
        }

        const totalCount = await blogCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount / +pageSize)

        const blogs =  await blogCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items: blogs.map(blogMapper)
        }
    }

    static async getEntityById(id: string): Promise<BlogResponseType | null> {
        const blog =  await blogCollection.findOne({_id: new ObjectId(id)})

        return !blog ? null : blogMapper(blog)
    }

    static async getAllPostsByBlogId(blogId: string, sortData: QueryPostByBlogIdInputModel): Promise<PostSortResponseType> {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        const posts = await postCollection
            .find({blogId: blogId})
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()

        const totalCount = await postCollection.countDocuments({blogId: blogId})

        const pagesCount = Math.ceil(totalCount / +pageSize)

        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items: posts.map(postMapper)
        }
    }
}