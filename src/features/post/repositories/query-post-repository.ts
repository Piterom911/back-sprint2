import {postCollection} from "../../../db/db";
import {ObjectId} from "mongodb";
import {QueryPostModel} from "../types/query-post-model";
import {PostSortResponseType} from "../types/post-sort-response-type";
import {PostResponseType} from "../types/post-response-type";
import {postMapper} from "../mappers/post-response-mapper";

export class QueryPostRepository {
    static async getAllEntities(sortData: QueryPostModel): Promise<PostSortResponseType> {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        const totalCount = await postCollection.countDocuments({})

        const pagesCount = Math.ceil(totalCount / +pageSize)

        const posts =  await postCollection
            .find({})
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items: posts.map(postMapper)
        }
    }

    static async getEntityById(id: string): Promise<PostResponseType | null> {
        const targetPost =  await postCollection.findOne({_id: new ObjectId(id)})
        if (!targetPost) return null
        return postMapper(targetPost)
    }
}