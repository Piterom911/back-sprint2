import {Router} from "express";
import {authController} from "../controllers/auth-сontroller";
import {authValidation} from "../validators/auth-validator";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";

export const authRouter = Router({})

authRouter.post('/login', authValidation(), authController.authLogin)
authRouter.get('/me', authJwtMiddleware, authController.authMe)

