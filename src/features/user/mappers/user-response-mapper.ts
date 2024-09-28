import {WithId} from "mongodb";
import {UserDBType} from "../../../db/db-models";
import {UserResponseType} from "../types/user-response-type";

export const userMapper = (userDb: WithId<UserDBType>): UserResponseType => {
    return {
        id: userDb._id.toString(),
        email: userDb.email,
        login: userDb.login,
        createdAt: userDb.createdAt
    }
}