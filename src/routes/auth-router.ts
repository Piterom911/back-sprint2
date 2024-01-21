import {Router} from "express";
import {HTTP_STATUS, RequestWithBody, ResponseType} from "../models/common";
import {AuthCredentialsModel} from "../models/auth/input/auth-credentials-input-model";
import {UserService} from "../domain/user-service";

export const authRouter = Router({})

authRouter.post('/login', async (req: RequestWithBody<AuthCredentialsModel>, res: ResponseType<boolean>): Promise<void> => {
    const loginOrEmail = req.body.loginOrEmail
    const password = req.body.password

    const isLoggedIn = await UserService.checkCredentials(loginOrEmail, password)

    if (!isLoggedIn) {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT)
})
