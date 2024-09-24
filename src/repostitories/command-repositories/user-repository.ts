import {userCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {UserDBType} from "../../models/db/db";

export class UserRepository {
    static async createNewEntity(newEntityData: UserDBType): Promise<string | null> {
        const result = await userCollection.insertOne(newEntityData)
        return result.insertedId.toString()
    }

    static async deleteEntity(id: string): Promise<boolean> {
        const isDeleted = await userCollection.deleteOne({_id: new ObjectId(id)})

        return !!isDeleted.deletedCount
    }
}