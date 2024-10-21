import {jwtService} from "../../../adapters/jwt-service";
import {comparePassword, generateHash} from "../../../utils/password-hash";
import {QueryUserRepository} from "../../user/repostitories/query-user-repository";
import {UserModel} from "../../../db/db-models";
import {randomUUID} from "node:crypto";
import {add} from "date-fns";
import {CommandUserRepository} from "../../user/repostitories/command-user-repository";
import {nodemailerService} from "../../../adapters/nodemailer-service";


export const authService = {

    async registerUser(login: string, pass: string, email: string): Promise<UserModel | null> {
        const user = await QueryUserRepository.findByLoginOrEmail(login, email);
        if (user) return null;

        const passwordHash = await generateHash(pass)//создать хэш пароля

        const newUser: UserModel = { // сформировать dto юзера
            login,
            email,
            passwordHash,
            createdAt: new Date(),
            emailConfirmation: {    // доп поля необходимые для подтверждения
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false
            }
        };
        const userId = await CommandUserRepository.createNewEntity(newUser);

        try {
            await nodemailerService.sendEmail(
                newUser.email,
                newUser.emailConfirmation.confirmationCode,
                "someEmail or subject")
                // emailExamples.registrationEmail);

        } catch (e: unknown) {
            console.error('Send email error', e);
            if (userId) {
                await CommandUserRepository.deleteEntity(userId);
            }
            return null;

        }
        return newUser;
    },

    async login(login: string, email: string, password: string): Promise<boolean | string> {
        try {
            const user = await QueryUserRepository.findByLoginOrEmail(login, email)
            if (user === null)
                return false;

            const pswCheck = await comparePassword(password, user.passwordHash)
            if (!pswCheck) return false;

            return await jwtService.createToken(user._id.toString())
        } catch (error) {
            throw new Error(`Cannot execute login: ${(error as Error).message}`)
        }
    }
}