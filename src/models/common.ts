import {Request, Response} from "express";

export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithParamsAndQuery<P, Q> = Request<P, {}, {}, Q>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>
export type RequestWithParamsAndBody<P, B> = Request<P, {}, B, {}>

export type ResponseType<T> = Response<T, {}>

export type ErrorMessage = {
    message: string,
    field: string
}

export type ErrorType = {
    errorsMessages: ErrorMessage[]
}

export const HTTP_STATUS = {
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

type HttpStatusKeys = keyof typeof HTTP_STATUS
export type HttpStatusType = (typeof HTTP_STATUS)[HttpStatusKeys]

export const URI_PATHS = {
    tests: '/testing/all-data',
    blogs: '/blogs',
    posts: '/posts',
    users: '/users'
}