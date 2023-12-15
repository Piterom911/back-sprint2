import {db} from "../db/db";
import {PostCreateModel, PostUpdateModel} from "../models/post/intup";
import {PostModel} from "../models/post/output";

export class PostsRepository {
    static getAllEntities() {
        return db.posts
    }

    static getEntityById(id: string) {
        return db.posts.find(b => b.id === id)
    }

    static postNewEntity(newEntityData: PostCreateModel) {
        let {title,content,blogId, shortDescription} = newEntityData
        const id: string = new Date().toString()
        const blogName = 'Any string'

        const newPost: PostModel = {
            id,
            title,
            content,
            shortDescription,
            blogId,
            blogName
        }

        db.posts.push(newPost)
        return newPost
    }

    static updateEntity(id: string, updateData: PostUpdateModel): boolean {
        let targetEntity = db.posts.find(b => b.id === id)
        if (!targetEntity) return false

        targetEntity.title = updateData.title
        targetEntity.shortDescription = updateData.shortDescription
        targetEntity.content = updateData.content
        targetEntity.blogId = updateData.blogId

        return true
    }

    static deleteEntity(id: string): boolean {
        for (let i = 0; i  < db.posts.length; i++) {
            if (db.posts[i].id === id) {
                db.posts.splice(i, 1)
                return true
            }
        }
        return false
    }
}