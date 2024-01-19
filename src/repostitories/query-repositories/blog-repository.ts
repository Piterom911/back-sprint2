import {blogCollection, postCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {QueryBlogInputModel, QueryPostByBlogIdInputModel} from "../../models/blog/input/query-blog-input-model";
import {blogMapper, postMapper} from "../../models/mappers/mapper";
import {SortBlogOutputModel} from "../../models/blog/output/sort-blog-output-model";
import {BlogOutputModel} from "../../models/blog/output/blog-output-model";
import {SortPostOutputModel} from "../../models/post/output/sort-post-output-model";

export class QueryBlogRepository {
    static async getAllEntities(sortData: QueryBlogInputModel): Promise<SortBlogOutputModel> {
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

    static async getEntityById(id: string): Promise<BlogOutputModel | null> {
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