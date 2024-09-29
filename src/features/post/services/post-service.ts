import {CreatePostModel} from "../types/create-post-model";
import {PostDBType} from "../../../db/db-models";
import {CommandPostRepository} from "../repositories/command-post-repository";
import {UpdatePostModel} from "../types/update-post-model";
import {QueryBlogRepository} from "../../blog/repostitories/query-blog-repository";

export class PostsService {

    static async postNewEntity(newEntityData: CreatePostModel): Promise<string | null> {
        let {title, content, blogId, shortDescription} = newEntityData
        const targetBlog = await QueryBlogRepository.getEntityById(blogId)

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

        const createdPost = await CommandPostRepository.postNewEntity(newPost)
        return createdPost ? createdPost.insertedId.toString() : null
    }

    static async updateEntity(id: string, updateData: UpdatePostModel): Promise<boolean> {
        return await CommandPostRepository.updateEntity(
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
        return await CommandPostRepository.deleteEntity(id)
    }
}