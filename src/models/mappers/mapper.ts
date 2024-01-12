import {WithId} from "mongodb";
import {BlogDBType, PostDBType} from "../db/db";
import {BlogOutputModel} from "../blog/output/blog-output-model";
import {PostOutputModel} from "../post/output/post-output-model";

export const blogMapper = (blogDb: WithId<BlogDBType>): BlogOutputModel => {
    return {
        id: blogDb._id.toString(),
        name: blogDb.name,
        description: blogDb.description,
        websiteUrl: blogDb.websiteUrl,
        createdAt: blogDb.createdAt,
        isMembership: blogDb.isMembership
    }
}
export const postMapper = (postDb: WithId<PostDBType>): PostOutputModel => {
    return {
        id: postDb._id.toString(),
        title: postDb.title,
        shortDescription: postDb.shortDescription,
        blogId: postDb.blogId,
        blogName: postDb.blogName,
        content: postDb.content,
        createdAt: postDb.createdAt
    }
}