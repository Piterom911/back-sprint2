import {RequestWithBody, ResponseType} from "../../../types/request-types";
import {Request, Response} from "express"
import {UserService} from "../../user/services/user-service";
import {jwtService} from "../../../adapters/jwt-service";
import {AccessTokenType, AuthLoginType} from "../types/auth-types";
import {AuthMeDTO} from "../../user/types/user-response";
import {QueryUserRepository} from "../../user/repostitories/query-user-repository";
import {HTTP_STATUS} from "../../../constants/http-status";
import {authService} from "../services/auth-service";
import {CreateUserDTO} from "../../user/types/create-user";

export const authController = {
    async authLogin(req: RequestWithBody<AuthLoginType>, res: ResponseType<AccessTokenType>): Promise<void> {
        const login = req.body.loginOrEmail
        const email = req.body.loginOrEmail
        const password = req.body.password

        try {
            const userLoggedIn = await UserService.checkCredentials(login, email, password)

            if (userLoggedIn) {
                const token = await jwtService.createToken(userLoggedIn)
                res.status(HTTP_STATUS.OK).send({accessToken: token})
            } else {
                res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
            }
        } catch (error) {
            console.error(`Server fail when trying to login: ${(error as Error).message}`)
            res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    },

    async authMe(req: Request, res: Response<AuthMeDTO>) {
        try {
            const result = await QueryUserRepository.findUserByToken(req.body.userId)
            res.status(HTTP_STATUS.OK).json(result!)
            return;
        } catch (error) {
            console.error(`Server fail when trying to login: ${(error as Error).message}`)
            res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    },

    async registration(req: RequestWithBody<CreateUserDTO>, res: Response) {
        const {login, password, email} = req.body
        const user = await authService.registerUser(login, password, email)

        if (user) res.status(HTTP_STATUS.CREATED).send()
        else res.status(HTTP_STATUS.BAD_REQUEST)
    }
}