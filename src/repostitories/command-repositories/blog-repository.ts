import {blogCollection} from "../../db/db";
import {InsertOneResult, ObjectId} from "mongodb";
import {BlogDBType} from "../../models/db/db";
import {UpdateBlogModel} from "../../models/blog/input/update-blog-input-model";

export class BlogRepository {
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