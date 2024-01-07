import {NextFunction, Request, Response} from "express";
import dotenv from 'dotenv'
import 'dotenv/config'
import {HTTP_STATUS} from "../../models/common";

dotenv.config()

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Not good to use
    /*
    if (req.headers['authorization'] !== 'Basic YWRtaW46cXdlcnR5') {
        res.sendStatus(HTTP_REQUEST_STATUS.UNAUTHORIZED)
        return
    }

    next()
    */


    // OR a Better Option to check authorization


    const auth = req.headers['authorization']
    if (!auth) {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return
    }

    const [basic, token ] = auth.split(' ')

    if (basic !== 'Basic') {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return
    }

    const decodedData = Buffer.from(token, 'base64').toString()
    // admin:qwerty

    const [login, password] = decodedData.split(':')
    if (login !== process.env.AUTH_LOGIN || password !== process.env.AUTH_PASSWORD) {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return
    }

    return next()
}