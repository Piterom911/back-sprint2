import {CommentDBType} from "../../../db/db-models";
import {InsertOneResult, ObjectId} from "mongodb";
import {commentCollection} from "../../../db/db";
import {UpdateCommentType} from "../types/update-comment-type";

export class CommandCommentRepository {
    static async postNewEntity(newEntityData: CommentDBType): Promise<InsertOneResult | null> {
        return await commentCollection.insertOne(newEntityData)
    }

    static async updateEntity(id: string, updateData: UpdateCommentType): Promise<boolean> {
        const targetEntity = await commentCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: updateData}
        )
        return !!targetEntity;
    }

    static async deleteEntity(id: string): Promise<boolean> {
        const targetPost = await commentCollection.deleteOne({_id: new ObjectId(id)})
        return !!targetPost
    }
}