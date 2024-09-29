import jwt from "jsonwebtoken"
import {SETTINGS} from "../settings";

export type JwtServiceTokenType = {
    resultCode: number
    data: { token: string }
}

export const jwtService = {
    async createToken(userId: string): Promise<string> {
        return jwt.sign({userId}, SETTINGS.jwt.secret, {expiresIn: '1h'})
    },
    async decodeToken(token: string): Promise<any> {
        try {
            return jwt.decode(token);
        } catch (e: unknown) {
            console.error("Can't decode token", e);
            return null;
        }
    },
    async verifyToken(token: string): Promise<{ userId: string } | null> {
        try {
            return jwt.verify(token, SETTINGS.jwt.secret) as { userId: string };
        } catch (error) {
            console.error("Token verify some error");
            return null;
        }
    },
}