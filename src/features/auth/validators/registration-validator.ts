import {body} from "express-validator";
import {inputValidation} from "../../../input-model-validation/input-validation";
import {QueryUserRepository} from "../../user/repostitories/query-user-repository";


export const loginValidation = body('login')
    .trim()
    .exists().withMessage('Login required')
    .isString().withMessage('Must be a string')
    .isLength({min: 3, max: 10})
    .withMessage('should be longer than 3 chars and smaller than 10')

export const passwordValidation = body('password')
    .exists().withMessage('Password required')
    .isString().withMessage('Must be a string')
    .isLength({min: 6, max: 20})
    .withMessage('should be longer than 6 chars and smaller than 20')

export const emailValidation = body('email')
    .isString()
    .trim()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
    .withMessage('Incorrect Email')
    .custom(async (email) => {
        // Проверяем наличие email в базе данных
        const user = await QueryUserRepository.findByEmail(email);
        if (user) {
            throw new Error('Email already in use');
        }
        return true;
    })


export const registrationValidator = () => [loginValidation, passwordValidation, emailValidation, inputValidation]