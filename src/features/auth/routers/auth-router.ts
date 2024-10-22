import {Router} from "express";
import {authController} from "../controllers/auth-сontroller";
import {authValidation} from "../validators/auth-validator";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";
import {registrationValidator} from "../validators/registration-validator";
import {confirmationValidator} from "../validators/confirmation-validator";

export const authRouter = Router({})

authRouter.post('/login', authValidation(), authController.authLogin)
authRouter.get('/me', authJwtMiddleware, authController.authMe)
authRouter.get('/registration', registrationValidator(), authController.registerUser)
authRouter.get('/registration-confirmation', confirmationValidator(), authController.confirmEmail)

