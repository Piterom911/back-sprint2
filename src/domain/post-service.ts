import {CreatePostModel} from "../models/post/input/create-post-input-model";
import {PostOutputModel} from "../models/post/output/post-output-model";
import {PostDBType} from "../models/db/db";
import {BlogRepository} from "../repositories/blog-repository";
import {WithId} from "mongodb";
import {postMapper} from "../models/mappers/mapper";
import {PostRepository} from "../repositories/post-repository";
import {UpdatePostModel} from "../models/post/input/update-post-input-model";

export class PostsService {

    static async getEntityById(id: string): Promise<PostOutputModel | null> {
        const targetPost: WithId<PostDBType> | null = await PostRepository.getEntityById(id)
        if (!targetPost) return null
        return postMapper(targetPost)
    }

    static async postNewEntity(newEntityData: CreatePostModel): Promise<string | null> {
        let {title, content, blogId, shortDescription} = newEntityData
        const targetBlog = await BlogRepository.getEntityById(blogId)

        if (!targetBlog) {
            return null
        }

        const newPost: PostDBType = {
            title,
            content,
            shortDescription,
            blogId,
            blogName: targetBlog.name,
            createdAt: new Date().toISOString()
        }

        const createdPost = await PostRepository.postNewEntity(newPost)
        return createdPost ? createdPost.insertedId.toString() : null
    }

    static async updateEntity(id: string, updateData: UpdatePostModel): Promise<boolean> {
        return await PostRepository.updateEntity(
            id,
            {
                title: updateData.title,
                shortDescription: updateData.shortDescription,
                content: updateData.content,
                blogId: updateData.blogId,
            }
        )
    }

    static async deleteEntity(id: string): Promise<boolean> {
        return await PostRepository.deleteEntity(id)
    }
}