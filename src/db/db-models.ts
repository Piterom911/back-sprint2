import {ObjectId} from "mongodb";

export type BlogDBType = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type PostDBType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type LoginDBType = {
    loginOrEmail: string
    password: string
}

export type UserDBType = {
    _id: ObjectId
    login: string
    email: string
    password: string
    createdAt: string
}

export type CommentDBType = {
    postId: string
    content: string
    commentatorInfo: {
        userId: string
        userLogin: string
    },
    createdAt: string
}
