import {postCollection} from "../db/db";
import {PostDBType} from "../models/db/db";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {UpdatePostModel} from "../models/post/input/update-post-input-model";

export class PostRepository {
    static async getAllEntities(): Promise<WithId<PostDBType>[]> {
        return await postCollection.find({}).toArray()
    }

    static async getEntityById(id: string): Promise<WithId<PostDBType> | null> {
        return await postCollection.findOne({_id: new ObjectId(id)})
    }

    static async postNewEntity(newEntityData: PostDBType): Promise<InsertOneResult | null> {
        return await postCollection.insertOne(newEntityData)
    }

    static async updateEntity(id: string, updateData: UpdatePostModel): Promise<boolean> {
        const targetEntity = await postCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: updateData}
        )
        return !!targetEntity;
    }

    static async deleteEntity(id: string): Promise<boolean> {
        const targetPost = await postCollection.deleteOne({_id: new ObjectId(id)})
        return !!targetPost
    }
}