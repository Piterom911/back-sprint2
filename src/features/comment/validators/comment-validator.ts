import {body} from "express-validator";
import {inputValidation} from "../../../input-model-validation/input-validation";

export const contentValidation = body('content')
    .isString()
    .trim()
    .isLength({min: 20, max: 300})
    .withMessage('This field should contain 20-300 words.')

export const commentValidation = () => [contentValidation, inputValidation]