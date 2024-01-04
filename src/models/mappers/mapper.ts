import {WithId} from "mongodb";
import {BlogDBType, PostDBType} from "../db/db";
import {OutputBlogType} from "../blog/output";
import {OutputPostType} from "../post/output";

export const blogMapper = (blogDb: WithId<BlogDBType>): OutputBlogType => {
    return {
        id: blogDb._id.toString(),
        name: blogDb.name,
        description: blogDb.description,
        websiteUrl: blogDb.websiteUrl,
        createdAt: blogDb.createdAt,
        isMembership: blogDb.isMembership
    }
}
export const postMapper = (postDb: WithId<PostDBType>): OutputPostType => {
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