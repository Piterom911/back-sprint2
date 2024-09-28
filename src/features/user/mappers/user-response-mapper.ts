import {WithId} from "mongodb";
import {UserDBType} from "../../../db/db-models";
import {UserOutputModel} from "../../../models/user/output/user-output-model";

export const userMapper = (userDb: WithId<UserDBType>): UserOutputModel => {
    return {
        id: userDb._id.toString(),
        email: userDb.email,
        login: userDb.login,
        createdAt: userDb.createdAt
    }
}