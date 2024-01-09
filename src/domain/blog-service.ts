import {BlogCreateModel, BlogUpdateModel} from "../models/blog/intup";
import {OutputBlogType} from "../models/blog/output";
import {blogMapper} from "../models/mappers/mapper";
import {WithId} from "mongodb";
import {BlogsRepository} from "../repositories/blogs-repository";
import {BlogDBType} from "../models/db/db";

export class BlogsService {
    static async getAllEntities(): Promise<OutputBlogType[]> {
        const blogs: WithId<BlogDBType>[] =  await BlogsRepository.getAllEntities()
        return blogs.map(blogMapper)
    }

    static async getEntityById(id: string): Promise<BlogDBType | null> {
        const blog = await BlogsRepository.getEntityById(id)

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

        const createdBlog = await BlogsRepository.postNewEntity(newBlog)
        return createdBlog ? createdBlog.insertedId.toString() : null
    }

    static async updateEntity(id: string, updateData: BlogUpdateModel): Promise<boolean> {
        return await BlogsRepository.updateEntity(
            id,
            {
                name: updateData.name,
                description: updateData.description,
                websiteUrl: updateData.websiteUrl

            })
    }

    static async deleteEntity(id: string): Promise<boolean> {
        return BlogsRepository.deleteEntity(id)
    }
}