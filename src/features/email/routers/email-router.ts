import {Router, Response} from "express";
import {URI_PATHS} from "../../../constants/uri-paths";
import {RequestWithBody} from "../../../types/request-types";
import {CreateEmailModel} from "../types/create-email-model";

export const emailRouter = Router({});

emailRouter.post(URI_PATHS.email, async (req: RequestWithBody<CreateEmailModel>, res: Response) => {
    res.send({
        email: req.body.email,
        message: req.body.message,
        subject: req.body.subject
    })
})