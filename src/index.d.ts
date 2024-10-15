declare global {
    namespace Express {
        export interface Request {
            userId: string | null
        }
    }
}

export type CustomRequest<P = {}, R = {}, B = {}, Q = {}> = Express.Request<P, R, B, Q>;
