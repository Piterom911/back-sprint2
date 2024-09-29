import {Router} from "express";
import {authController} from "../controllers/auth-сontroller";
import {authValidation} from "../validators/auth-validator";
import {inputValidation} from "../../../input-model-validation/input-validation";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";

export const authRouter = Router({})

authRouter.post('/login', authValidation, inputValidation, authController.authLogin)
authRouter.get('/me', authJwtMiddleware, authController.authMe)

