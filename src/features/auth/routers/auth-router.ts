import {Router} from "express";
import {authController} from "../controllers/authController";
import {authValidation} from "../validators/auth-validator";
import {inputValidation} from "../../../input-model-validation/input-validation";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-JWT-middleware";

export const authRouter = Router({})

authRouter.post('/login', authValidation, inputValidation, authController.authLogin)
authRouter.get('/me', authJwtMiddleware, authController.authMe)

