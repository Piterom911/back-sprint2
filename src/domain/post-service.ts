import {PostCreateModel, PostUpdateModel} from "../models/post/intup";
import {OutputPostType} from "../models/post/output";
import {PostDBType} from "../models/db/db";
import {BlogsRepository} from "../repositories/blogs-repository";
import {WithId} from "mongodb";
import {postMapper} from "../models/mappers/mapper";
import {PostsRepository} from "../repositories/posts-repository";

export class PostsService {
    static async getAllEntities(): Promise<OutputPostType[]> {
        const posts: WithId<PostDBType>[] = await PostsRepository.getAllEntities()
        return posts.map(postMapper)
    }

    static async getEntityById(id: string): Promise<OutputPostType | null> {
        const targetPost: WithId<PostDBType> | null = await PostsRepository.getEntityById(id)
        if (!targetPost) return null
        return postMapper(targetPost)
    }

    static async postNewEntity(newEntityData: PostCreateModel): Promise<string | null> {
        let {title, content, blogId, shortDescription} = newEntityData
        const targetBlog = await BlogsRepository.getEntityById(blogId)

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

        const createdPost = await PostsRepository.postNewEntity(newPost)
        return createdPost ? createdPost.insertedId.toString() : null
    }

    static async updateEntity(id: string, updateData: PostUpdateModel): Promise<boolean> {
        return await PostsRepository.updateEntity(
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
        return await PostsRepository.deleteEntity(id)
    }
}