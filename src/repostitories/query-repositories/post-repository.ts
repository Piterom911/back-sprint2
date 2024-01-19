import {postCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {QueryPostInputModel} from "../../models/post/input/query-post-input-model";
import {postMapper} from "../../models/mappers/mapper";
import {SortPostOutputModel} from "../../models/post/output/sort-post-output-model";
import {PostOutputModel} from "../../models/post/output/post-output-model";

export class QueryPostRepository {
    static async getAllEntities(sortData: QueryPostInputModel): Promise<SortPostOutputModel> {
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

    static async getEntityById(id: string): Promise<PostOutputModel | null> {
        const targetPost =  await postCollection.findOne({_id: new ObjectId(id)})
        if (!targetPost) return null
        return postMapper(targetPost)
    }
}