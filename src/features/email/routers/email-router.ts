import {Response, Router} from "express";
import {RequestWithBody} from "../../../types/request-types";
import {CreateEmailModel} from "../types/create-email-model";
import {nodemailerService} from "../../../adapters/nodemailer-service";

export const emailRouter = Router({});

emailRouter.post("", async (req: RequestWithBody<CreateEmailModel>, res: Response) => {
    try {
        const {email, message, subject} = req.body
        await nodemailerService.sendEmail(email, message, subject)

        res.send({
            email: email,
            message: message,
            subject: subject
        })
    } catch (e) {
        console.log(e)
    }
})