import {postCollection} from "../db/db";
import {PostCreateModel, PostUpdateModel} from "../models/post/intup";
import {OutputPostType} from "../models/post/output";
import {PostDBType} from "../models/db/db";
import {BlogsRepository} from "./blogs-repository";
import {ObjectId} from "mongodb";
import {postMapper} from "../models/mappers/mapper";

export class PostsRepository {
    static async getAllEntities() {
        const posts =  await postCollection.find({}).toArray()
        return posts.map(postMapper)
    }

    static async getEntityById(id: string): Promise<OutputPostType | null> {
        const targetPost = await postCollection.findOne({_id: new ObjectId(id)})
        if (!targetPost) return null
        return postMapper(targetPost)
    }

    static async postNewEntity(newEntityData: PostCreateModel): Promise<string | null> {
        let {title,content,blogId, shortDescription} = newEntityData
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

        const createdPost = await postCollection.insertOne(newPost)
        return createdPost.insertedId.toString()
    }

    static async updateEntity(id: string, updateData: PostUpdateModel): Promise<boolean> {
        const targetEntity = await postCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    title: updateData.title,
                    shortDescription: updateData.shortDescription,
                    content: updateData.content,
                    blogId: updateData.blogId,
                }
            })
        return !!targetEntity;


    }

    static async deleteEntity(id: string): Promise<boolean> {
        const targetPost = await postCollection.deleteOne({_id: new ObjectId(id)})
        return !!targetPost
    }
}