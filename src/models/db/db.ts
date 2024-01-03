import {OutputBlogType} from "../blog/output";
import {OutputPostType} from "../post/output";
import {OutputVideoType} from "../videos/output";
import {AvailableVideoResolutions} from "../common";

export type DBType = {
    blogs: OutputBlogType[],
    posts: OutputPostType[],
    videos: OutputVideoType[]
}

export type BlogDBType = {
    name: string
    description: string
    websiteUrl: string
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
