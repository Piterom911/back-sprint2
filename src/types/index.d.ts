import {UserDBType} from "../db/db-models";

declare global {
    namespace Express {
        export interface Request {
            user: UserDBType | null
        }
    }
}