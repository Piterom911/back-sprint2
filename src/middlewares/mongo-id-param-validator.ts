import {param} from "express-validator";
import {inputValidation} from "../input-model-validation/input-validation";

export const mongoIDValidation = param('id').isString().isMongoId().withMessage('ID is NOT a mongoID');

export const mongoIdParamValidation = () => [mongoIDValidation, inputValidation];