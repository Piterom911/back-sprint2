import {CreateBlogModel} from "../models/blog/input/create-blog-input-model";
import {OutputBlogModel} from "../models/blog/output/output";
import {blogMapper} from "../models/mappers/mapper";
import {WithId} from "mongodb";
import {BlogsRepository} from "../repositories/blogs-repository";
import {BlogDBType} from "../models/db/db";
import {UpdateBlogModel} from "../models/blog/input/update-blog-input-model";

export class BlogsService {
    static async getAllEntities(): Promise<OutputBlogModel[]> {
        const blogs: WithId<BlogDBType>[] =  await BlogsRepository.getAllEntities()
        return blogs.map(blogMapper)
    }

    static async getEntityById(id: string): Promise<BlogDBType | null> {
        const blog = await BlogsRepository.getEntityById(id)

        return !blog ? null : blogMapper(blog)
    }

    static async postNewEntity(newEntityData: CreateBlogModel): Promise<string | null> {
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

    static async updateEntity(id: string, updateData: UpdateBlogModel): Promise<boolean> {
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