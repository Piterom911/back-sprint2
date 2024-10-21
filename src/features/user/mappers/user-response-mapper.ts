import {WithId} from "mongodb";
import {UserModel} from "../../../db/db-models";
import {UserResponseDTO} from "../types/user-response";

export const userMapper = (userDb: WithId<UserModel>): UserResponseDTO => {
    return {
        id: userDb._id.toString(),
        email: userDb.email,
        login: userDb.login,
        createdAt: userDb.createdAt.toISOString()
    }
}