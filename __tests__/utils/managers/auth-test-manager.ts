import request from "supertest";
import {app} from "../../../src/app";
import {HTTP_STATUS, HttpStatusType} from "../../../src/constants/http-status";
import {URI_PATHS} from "../../../src/constants/uri-paths";
import {UserService} from "../../../src/features/user/services/user-service";

const getRequest = () => request(app)

export const authTestManager = {
    async authMe(expectedStatusCode: HttpStatusType = HTTP_STATUS.OK, authData: string) {
        return getRequest()
            .get(`${URI_PATHS.auth}/me`)
            .set('Authorization', authData)
            .expect(expectedStatusCode)
    },

    async logIn(data: UserService, expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED,) {

        return getRequest()
            .post(`${URI_PATHS.auth}/login`)
            .send(data)
            .expect(expectedStatusCode);
    },
}