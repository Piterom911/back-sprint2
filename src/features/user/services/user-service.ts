import {CreateUserModel} from "../types/create-user-model";
import {CommandUserRepository} from "../repostitories/command-user-repository";
import {ObjectId} from "mongodb";
import {QueryUserRepository} from "../repostitories/query-user-repository";
import {comparePassword, generateHash} from "../../../utils/password-hash";

export class UserService {

    static async createNewEntity(newEntityData: CreateUserModel): Promise<string | null> {
        let {login, email, password} = newEntityData

        const hash = await generateHash(password)

        const newUser = {
            _id: new ObjectId(),
            login,
            email,
            password: hash,
            createdAt: new Date().toISOString(),
        }

        console.log(newUser)

        return await CommandUserRepository.createNewEntity(newUser)
    }

    static async deleteEntity(id: string): Promise<boolean> {
        return CommandUserRepository.deleteEntity(id)
    }

    static async checkCredentials(loginOrEmail: string, password: string): Promise<any> {
        const targetUser = await QueryUserRepository.findByLoginOrEmail(loginOrEmail)
        if (!targetUser) return null

        if (await comparePassword(password, targetUser.password)) return targetUser._id.toString()
    }
}