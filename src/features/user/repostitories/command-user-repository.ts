import {userCollection} from "../../../db/db";
import {ObjectId} from "mongodb";
import {UserModel} from "../../../db/db-models";

export class CommandUserRepository {
    static async createNewEntity(newEntityData: UserModel): Promise<string | null> {
        const result = await userCollection.insertOne(newEntityData)
        return result.insertedId.toString()
    }

    static async deleteEntity(id: string): Promise<boolean> {
        const isDeleted = await userCollection.deleteOne({_id: new ObjectId(id)})

        return !!isDeleted.deletedCount
    }

    static async confirmEmail(code: string, _id: ObjectId) {
        const result = await userCollection.updateOne({_id: _id},
            {$set: {"emailConfirmation.isConfirmed": true}})
        return result.modifiedCount === 1;
    }
}