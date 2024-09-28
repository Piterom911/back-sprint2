import {postCollection} from "../../../db/db";
import {PostDBType} from "../../../db/db-models";
import {InsertOneResult, ObjectId} from "mongodb";
import {UpdatePostModel} from "../types/update-post-model";

export class CommandPostRepository {
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