import {CreateBlogModel} from "../models/blog/input/create-blog-input-model";
import {blogMapper} from "../models/mappers/mapper";
import {BlogRepository} from "../repositories/blog-repository";
import {BlogDBType} from "../models/db/db";
import {UpdateBlogModel} from "../models/blog/input/update-blog-input-model";

export class BlogsService {

    static async getEntityById(id: string): Promise<BlogDBType | null> {
        const blog = await BlogRepository.getEntityById(id)

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

        const createdBlog = await BlogRepository.postNewEntity(newBlog)
        return createdBlog ? createdBlog.insertedId.toString() : null
    }

    static async updateEntity(id: string, updateData: UpdateBlogModel): Promise<boolean> {
        return await BlogRepository.updateEntity(
            id,
            {
                name: updateData.name,
                description: updateData.description,
                websiteUrl: updateData.websiteUrl

            })
    }

    static async deleteEntity(id: string): Promise<boolean> {
        return BlogRepository.deleteEntity(id)
    }
}