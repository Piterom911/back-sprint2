import {OutputBlogType} from "../blog/output";
import {OutputPostType} from "../post/output";
import {AvailableVideoResolutions} from "../common";

export type DBType = {
    blogs: OutputBlogType[],
    posts: OutputPostType[],
}

export type BlogDBType = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type PostDBType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}


export type VideoDBType = {
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: typeof AvailableVideoResolutions
}
