import {blogCollection, postCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {QueryBlogModel, QueryPostByBlogIdInputModel} from "../../features/blog/types/query-blog-model";
import {blogMapper, postMapper} from "../../models/mappers/mapper";
import {BlogSortType} from "../../features/blog/types/blog-sort-type";
import {BlogResponseType} from "../../features/blog/types/blog-response-type";
import {SortPostOutputModel} from "../../models/post/output/sort-post-output-model";

export class QueryBlogRepository {
    static async getAllEntities(sortData: QueryBlogModel): Promise<BlogSortType> {
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

    static async getAllPostsByBlogId(blogId: string, sortData: QueryPostByBlogIdInputModel): Promise<SortPostOutputModel> {
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