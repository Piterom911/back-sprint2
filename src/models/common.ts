import {Request} from "express";

export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithParamsAndBody<P, B> = Request<P, {}, B, {}>

export type ErrorMessage = {
    message: string,
    field: string
}

export type ErrorType = {
    errorsMessages: ErrorMessage[]
}

export const HTTP_REQUEST_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204, // Нет содержимого

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405, // Метод не разрешен
    CONFLICT: 409, // Конфликт

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501, // Не реализовано
    BAD_GATEWAY: 502, // Плохой шлюз
    SERVICE_UNAVAILABLE: 503, // Служба недоступна
    GATEWAY_TIMEOUT: 504, // Шлюз не отвечает
};

export const URI_PATHS = {
    videos: '/videos',
    blogs: '/blogs',
    posts: '/posts',
    tests: '/testing/all-data'
}

export const AvailableVideoResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
