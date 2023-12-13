import {db} from "../db/db";

export class BlogsRepository {
    static getAllBlogs() {
        return db.blogs
    }

    static getBlogById(id: string) {
        return db.blogs.find(b => b.id === id)
    }
}