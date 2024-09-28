import {CreateBlogModel, CreatePostBlogModel} from "../types/create-blog-model";
import {CommandBlogRepository} from "../repostitories/command-blog-repository";
import {UpdateBlogModel} from "../types/update-blog-model";
import {PostsService} from "../../post/services/post-service";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";

export class BlogsService {

    static async postNewEntity(newEntityData: CreateBlogModel): Promise<string | null> {
        let {name, description, websiteUrl} = newEntityData
        const newBlog = {
            name,
            description,
            websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }

        const createdBlog = await CommandBlogRepository.postNewEntity(newBlog)
        return createdBlog ? createdBlog.insertedId.toString() : null
    }

    static async createNewPostToBlogId(blogId: string, newPostData: CreatePostBlogModel): Promise<string | null> {
        const blog = await QueryBlogRepository.getEntityById(blogId)

        const post = {
            title: newPostData.title,
            content: newPostData.content,
            shortDescription: newPostData.shortDescription,
            blogName: blog?.name,
            blogId
        }

        return await PostsService.postNewEntity(post)

    }

    static async updateEntity(id: string, updateData: UpdateBlogModel): Promise<boolean> {
        return await CommandBlogRepository.updateEntity(
            id,
            {
                name: updateData.name,
                description: updateData.description,
                websiteUrl: updateData.websiteUrl

            })
    }

    static async deleteEntity(id: string): Promise<boolean> {
        return CommandBlogRepository.deleteEntity(id)
    }
}