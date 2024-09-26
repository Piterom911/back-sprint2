import {ObjectId} from "mongodb";

export type UserOutputModel = {
    id: string,
    login: string,
    email: string,
    createdAt: string
}

export type AuthMeViewModel = {
    email: string,
    login: string,
    userId: ObjectId
}