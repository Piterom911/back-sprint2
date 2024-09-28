import {WithId} from "mongodb";
import {PostDBType} from "../../../db/db-models";
import {PostResponseType} from "../types/post-response-type";

export const postMapper = (postDb: WithId<PostDBType>): PostResponseType => {
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