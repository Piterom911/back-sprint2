import {WithId} from "mongodb";
import {BlogDBType} from "../../../db/db-models";
import {BlogResponseType} from "../types/blog-response-type";

export const blogMapper = (blogDb: WithId<BlogDBType>): BlogResponseType => {
    return {
        id: blogDb._id.toString(),
        name: blogDb.name,
        description: blogDb.description,
        websiteUrl: blogDb.websiteUrl,
        createdAt: blogDb.createdAt,
        isMembership: blogDb.isMembership
    }
}