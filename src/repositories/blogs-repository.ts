import {blogCollection} from "../db/db";
import {BlogCreateModel, BlogUpdateModel} from "../models/blog/intup";
import {OutputBlogType} from "../models/blog/output";
import {blogMapper} from "../models/mappers/mapper";
import {ObjectId} from "mongodb";

export class BlogsRepository {
    static async getAllEntities(): Promise<OutputBlogType[]> {
        const blogs = await blogCollection.find({}).toArray()
        return blogs.map(blogMapper)
    }

    static async getEntityById(id: string): Promise<OutputBlogType | null> {
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})

        return !blog ? null : blogMapper(blog)
    }

    static async postNewEntity(newEntityData: BlogCreateModel): Promise<string | null> {
        let {name, description, websiteUrl} = newEntityData
        const newBlog = {
            name,
            description,
            websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }

        const createdBlog = await blogCollection.insertOne(newBlog)
        return createdBlog.insertedId.toString()
    }

    static async updateEntity(id: string, updateData: BlogUpdateModel): Promise<boolean> {
        const blog = await blogCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl
                }
            })
        return !!blog.matchedCount
    }

    static async deleteEntity(id: string): Promise<boolean> {
        const blog = await blogCollection.deleteOne({_id: new ObjectId(id)})

        return !!blog.deletedCount
    }
}