import {db} from "../db/db";
import {BlogCreateModel, BlogUpdateModel} from "../models/blog/intup";

export class BlogsRepository {
    static getAllEntities() {
        return db.blogs
    }

    static getEntityById(id: string) {
        return db.blogs.find(b => b.id === id)
    }

    static postNewEntity(newEntityData: BlogCreateModel) {
        let {name, description, websiteUrl} = newEntityData
        const id: string = new Date().toString()

        const newBlog = {
            id,
            name,
            description,
            websiteUrl
        }

        db.blogs.push(newBlog)
        return newBlog
    }

    static updateEntity(id: string, updateData: BlogUpdateModel): boolean {
        let targetEntity = db.blogs.find(b => b.id === id)
        if (!targetEntity) return false

        targetEntity.name = updateData.name
        targetEntity.description = updateData.description
        targetEntity.websiteUrl = updateData.websiteUrl

        return true
    }

    static deleteEntity(id: string): boolean {
        for (let i = 0; i  < db.blogs.length; i++) {
            if (db.blogs[i].id === id) {
                db.blogs.splice(i, 1)
                return true
            }
        }
        return false
    }
}