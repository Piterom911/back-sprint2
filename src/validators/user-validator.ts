import {body} from "express-validator";
import {inputValidation} from "../input-model-validation/input-validation";
import {QueryUserRepository} from "../features/user/repostitories/query-user-repository";

export const loginValidation = body('login')
    .isString()
    .trim()
    .matches('^[a-zA-Z0-9_-]*$')
    .isLength({min: 3, max: 10})
    .withMessage('Incorrect Login')
        .custom(async (login) => {
            // Проверяем наличие email в базе данных
            const user = await QueryUserRepository.findByLogin(login);
            if (user) {
                throw new Error('Login already in use');
            }
            return true;
        })

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
    .custom(async (email) => {
            // Проверяем наличие email в базе данных
            const user = await QueryUserRepository.findByEmail(email);
            if (user) {
                throw new Error('Email already in use');
            }
            return true;
        })

export const userValidation = () => [loginValidation, passwordValidation, emailValidation, inputValidation]