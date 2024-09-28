import {Router} from "express";
import {authOntroller} from "../controllers/auth-сontroller";
import {authValidation} from "../validators/auth-validator";
import {inputValidation} from "../../../input-model-validation/input-validation";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-JWT-middleware";

export const authRouter = Router({})

authRouter.post('/login', authValidation, inputValidation, authOntroller.authLogin)
authRouter.get('/me', authJwtMiddleware, authOntroller.authMe)

