import {URI_PATHS} from "../../../src/constants/uri-paths";
import request from "supertest";
import {app} from "../../../src/app";
import {AuthLoginType} from "../../../src/features/auth/types/auth-types";

export const authenticateUser = async (loginData: AuthLoginType): Promise<string> => {
    const auth = await request(app)
        .post(`${URI_PATHS.auth}/login`)
        .send({loginOrEmail: loginData.loginOrEmail, password: loginData.password})

    return `Bearer ${auth.body.accessToken}`;
}