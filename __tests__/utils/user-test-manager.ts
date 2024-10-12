import request from "supertest";
import {app} from "../../src/app";
import {HTTP_STATUS, HttpStatusType} from "../../src/constants/http-status";
import {URI_PATHS} from "../../src/constants/uri-paths";
import {UserService} from "../../src/features/user/services/user-service";

const getRequest = () => request(app)

export const userTestManager = {
    async getUsers(expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED, authData: string) {
        return getRequest()
            .get(URI_PATHS.users)
            .set('Authorization', authData)
            .expect(expectedStatusCode)
    },

    async createUser(data: UserService,
                     expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED,
                     authData: string
    ) {

        return getRequest()
            .post(URI_PATHS.users)
            .set('Authorization', authData)
            .send(data)
            .expect(expectedStatusCode);
    },

    async deleteUser(expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED, userId: string, authData: string) {
        return getRequest()
            .delete(`${URI_PATHS.users}/${userId}`)
            .set('Authorization', authData)
            .expect(expectedStatusCode);
    }
}