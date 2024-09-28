import {HTTP_STATUS, RequestWithBody, ResponseType} from "../../../models/common";
import {Request, Response} from "express"
import {UserService} from "../../../services/user-service";
import {jwtService} from "../../../adapters/jwtService";
import {AccessTokenType, AuthLoginType} from "../types/auth-types";
import {AuthMeViewModel} from "../../../models/user/output/user-output-model";
import {QueryUserRepository} from "../../../repostitories/query-repositories/query-user-repository";

export const authOntroller = {
    async authLogin(req: RequestWithBody<AuthLoginType>, res: ResponseType<AccessTokenType>): Promise<void> {
        const loginOrEmail = req.body.loginOrEmail
        const password = req.body.password

        try {
            const userLoggedIn = await UserService.checkCredentials(loginOrEmail, password)

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

    async authMe(req: Request, res: Response<AuthMeViewModel>) {
        try {
            const result = await QueryUserRepository.findUserByToken(req.body.userId)
            res.status(HTTP_STATUS.OK).json(result!)
            return;
        } catch (error) {
            console.error(`Server fail when trying to login: ${(error as Error).message}`)
            res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    }
}