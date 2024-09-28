import {Request, Response} from "express";

export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithParamsAndQuery<P, Q> = Request<P, {}, {}, Q>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>
export type RequestWithParamsAndBody<P, B> = Request<P, {}, B, {}>

export type ResponseType<T> = Response<T, {}>

