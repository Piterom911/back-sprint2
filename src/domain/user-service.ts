import {CreateUserModel} from "../models/user/input/create-user-input-model";
import bcrypt from 'bcrypt'
import {UserRepository} from "../repostitories/params-repositories/user-repository";
import {ObjectId} from "mongodb";
import {QueryUserRepository} from "../repostitories/query-repositories/user-repository";

export class UserService {

    static async createNewEntity(newEntityData: CreateUserModel): Promise<string | null> {
        let {login, email, password} = newEntityData

        const hash = await this._generateHash(password)

        const newUser = {
            _id: new ObjectId(),
            login,
            email,
            password: hash,
            createdAt: new Date().toISOString(),
        }

        console.log(newUser)

        return await UserRepository.createNewEntity(newUser)
    }

    static async deleteEntity(id: string): Promise<boolean> {
        return UserRepository.deleteEntity(id)
    }

    static async _generateHash(password: string) {
        return await bcrypt.hash(password,10)
    }

    static async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {
        const targetUser = await QueryUserRepository.findByLoginOrEmail(loginOrEmail)
        if (!targetUser) return false

        return bcrypt.compare(password, targetUser.password)
    }
}