import {body} from "express-validator";
import {inputValidation} from "../../../input-model-validation/input-validation";


export const loginOrEmailValidation = body('loginOrEmail')
        .exists().withMessage('Login required')
        .isString().withMessage('Must be a string')

export const passwordValidation = body('password')
        .exists().withMessage('Password required')
        .isString().withMessage('Must be a string')



export const authValidation = () => [loginOrEmailValidation, passwordValidation, inputValidation]