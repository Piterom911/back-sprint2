import {ObjectId} from "mongodb";

export type UserResponseDTO = {
    id: string,
    login: string,
    email: string,
    createdAt: string
}

export type AuthMeDTO = {
    email: string,
    login: string,
    userId: ObjectId
}