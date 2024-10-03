import {NextFunction, Response, Request} from "express";
import {jwtService} from "../../adapters/jwt-service";

import {HTTP_STATUS} from "../../constants/http-status";


export const authJwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return;
    }
    const token: string = req.headers.authorization.split(' ')[1]
    try {
        const userData = await jwtService.verifyToken(token)
        req.userId = userData!.userId as string
        next()
    } catch {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return;
    }
}