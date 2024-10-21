import {CreateUserDTO} from "../types/create-user";
import {CommandUserRepository} from "../repostitories/command-user-repository";
import {QueryUserRepository} from "../repostitories/query-user-repository";
import {comparePassword, generateHash} from "../../../utils/password-hash";
import {UserModel, UserModelWithId} from "../../../db/db-models";
import {randomUUID} from "node:crypto";
import {add} from "date-fns";

export class UserService {

    static async createNewEntity(newEntityData: CreateUserDTO): Promise<string | null> {
        let {login, email, password} = newEntityData

        const hash = await generateHash(password)

        const newUser: UserModel = {
            login,
            email,
            passwordHash: hash,
            createdAt: new Date(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3,
                }),
                isConfirmed: false
            }
        }

        return await CommandUserRepository.createNewEntity(newUser)
    }

    static async deleteEntity(id: string): Promise<boolean> {
        return CommandUserRepository.deleteEntity(id)
    }

    static async checkCredentials(login: string, email: string, password: string): Promise<any> {
        const targetUser = await QueryUserRepository.findByLoginOrEmail(login, email)
        if (!targetUser) return null

        if (await comparePassword(password, targetUser.passwordHash)) return targetUser._id.toString()
    }
}