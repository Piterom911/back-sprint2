import {Router} from "express";
import {HTTP_STATUS, RequestWithBody, ResponseType} from "../models/common";
import {AuthCredentialsModel} from "../models/auth/input/auth-credentials-input-model";
import {UserService} from "../services/user-service";
import {jwtService, JwtServiceTokenType} from "../adapters/jwtService";

export const authRouter = Router({})

authRouter.post('/login', async (req: RequestWithBody<AuthCredentialsModel>, res: ResponseType<string>): Promise<void> => {
    const loginOrEmail = req.body.loginOrEmail
    const password = req.body.password

    const userLoggedIn = await UserService.checkCredentials(loginOrEmail, password)

    if (userLoggedIn) {
        const token = await jwtService.createToken(userLoggedIn)
        res.status(HTTP_STATUS.NO_CONTENT).send(token)
    } else {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
    }
})
