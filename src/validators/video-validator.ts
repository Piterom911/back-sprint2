import {body} from "express-validator";
import {inputValidation} from "../input-model-validation/input-validation";
import {BlogsRepository} from "../repositories/blogs-repository";
import {AvailableVideoResolutions} from "../models/common";

export const titleValidation = body('title')
    .isString()
    .trim()
    .isLength({min: 2, max: 40})
    .withMessage('Incorrect Title')

export const authorValidation = body('author')
    .isString()
    .trim()
    .isLength({min: 2, max: 20})
    .withMessage('Incorrect Author name')

export const availableResolutionsValidation = body('availableResolutions')
    .optional()
    .isArray()
    .custom((value = []) => {
        // Проверка, что все присутствующие элементы входящего массива принадлежат к allowedValues
        const presentValues = value.filter((item: string) => item !== undefined);
        return presentValues.every((item: string) => AvailableVideoResolutions.includes(item));
    })
    .withMessage('Incorrect AvailableVideoResolutions. ' +
        'You can use only these resolutions: ' +
        '\'P144\', \'P240\', \'P360\', \'P480\', \'P720\', \'P1080\', \'P1440\', \'P2160\'')


export const minAgeRestrictionValidation = body('minAgeRestriction')
    .optional()
    .custom((value) => {
        return value === null || (typeof value === 'number' && value >= 1 && value <= 18);
    })
    .withMessage('Check the age')

export const canBeDownloadedValidation = body('canBeDownloaded')
    .optional()
    .isBoolean()
    .withMessage('Check canBeDownloaded field. Must contain the boolean type.')

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
export const publicationDateValidation = body('publicationDate')
    .optional()
    .isString()
    .matches(isoDateRegex)
    .withMessage('Date format is wrong')

export const videoValidation = () =>
    [titleValidation, authorValidation, availableResolutionsValidation, inputValidation]

export const videoUpdateValidation = () => [
    titleValidation,
    authorValidation,
    availableResolutionsValidation,
    minAgeRestrictionValidation,
    canBeDownloadedValidation,
    publicationDateValidation,
    inputValidation]


















