import {blogCollection} from "../db/db";
import {BlogUpdateModel} from "../models/blog/intup";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {BlogDBType} from "../models/db/db";

export class BlogsRepository {
    static async getAllEntities(): Promise<WithId<BlogDBType>[]> {
        return await blogCollection.find({}).toArray()
    }

    static async getEntityById(id: string): Promise<WithId<BlogDBType> | null> {
        return await blogCollection.findOne({_id: new ObjectId(id)})
    }

    static async postNewEntity(newEntityData: BlogDBType): Promise<InsertOneResult | null> {
        return await blogCollection.insertOne(newEntityData)
    }

    static async updateEntity(id: string, updateData: BlogUpdateModel): Promise<boolean> {
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