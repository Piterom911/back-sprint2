import {body} from "express-validator";
import {inputValidation} from "../input-model-validation/input-validation";

export const loginValidation = body('login')
    .isString()
    .trim()
    .matches('^[a-zA-Z0-9_-]*$')
    .isLength({min: 3, max: 10})
    .withMessage('Incorrect Login')

export const passwordValidation = body('password')
    .isString()
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('Incorrect Password')

export const emailValidation = body('email')
    .isString()
    .trim()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
    .withMessage('Incorrect Email')

export const userValidation = () => [loginValidation, passwordValidation, emailValidation, inputValidation]