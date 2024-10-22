import {body} from "express-validator";
import {inputValidation} from "../../../input-model-validation/input-validation";

export const codeConfirmationValidation = body('code')
    .trim().isString().withMessage('Confirmation code must be a string')
    .exists().withMessage('Confirmation code is required')

export const emailValidation = body('email')
    .trim().isString().withMessage('Email code must be a string')
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
    .withMessage('Incorrect Email')


export const confirmationValidator = () => [codeConfirmationValidation, emailValidation, inputValidation]