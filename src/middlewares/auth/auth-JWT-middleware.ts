import {Request, Response, NextFunction} from "express";
import {jwtService} from "../../adapters/jwtService";

import {HTTP_STATUS} from "../../constants/http-status";


export const authJwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return;
    }
    const token: string = req.headers.authorization.split(' ')[1]
    try {
        req.body.userID = await jwtService.verifyToken(token)
        next()
    } catch {
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED)
        return;
    }
}