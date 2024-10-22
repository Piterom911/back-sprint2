import {jwtService} from "../../../adapters/jwt-service";
import {comparePassword, generateHash} from "../../../utils/password-hash";
import {QueryUserRepository} from "../../user/repostitories/query-user-repository";
import {UserModel} from "../../../db/db-models";
import {randomUUID} from "node:crypto";
import {add} from "date-fns";
import {CommandUserRepository} from "../../user/repostitories/command-user-repository";
import {nodemailerService} from "../../../adapters/nodemailer-service";
import {ConfirmationEmailDTO} from "../../user/types/confirm-email";


export const authService = {

    async confirmEmailByCode(data: ConfirmationEmailDTO): Promise<boolean> {
        const {confirmationCode, email} = data
        const user = await QueryUserRepository.findByEmail(email);
        if (!user) return false;
        if (user.emailConfirmation.confirmationCode === confirmationCode && user.emailConfirmation.expirationDate > new Date()) {
            return await CommandUserRepository.confirmEmail(confirmationCode, user._id)
        }
        return false;

    },

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