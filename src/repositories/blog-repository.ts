import {blogCollection} from "../db/db";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {BlogDBType} from "../models/db/db";
import {UpdateBlogModel} from "../models/blog/input/update-blog-input-model";
import {QueryBlogInputModel} from "../models/blog/input/query-blog-input-model";
import {blogMapper} from "../models/mappers/mapper";
import {SortBlogOutputModel} from "../models/blog/output/sort-blog-output-model";

export class BlogRepository {
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

        const pagesCount = Math.ceil(totalCount / pageSize)

        const blogs =  await blogCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: blogs.map(blogMapper)
        }
    }

    static async getEntityById(id: string): Promise<WithId<BlogDBType> | null> {
        return await blogCollection.findOne({_id: new ObjectId(id)})
    }

    static async postNewEntity(newEntityData: BlogDBType): Promise<InsertOneResult | null> {
        return await blogCollection.insertOne(newEntityData)
    }

    static async updateEntity(id: string, updateData: UpdateBlogModel): Promise<boolean> {
        const blog = await blogCollection.updateOne(
            {_id: new ObjectId(id)},
            { $set: updateData }
        )
        return !!blog.matchedCount
    }

    static async deleteEntity(id: string): Promise<boolean> {
        const deleteResult = await blogCollection.deleteOne({_id: new ObjectId(id)})

        return !!deleteResult.deletedCount
    }
}