import request from "supertest";
import {app} from "../../../src/app";
import {HTTP_STATUS, HttpStatusType} from "../../../src/constants/http-status";
import {URI_PATHS} from "../../../src/constants/uri-paths";

const getRequest = () => request(app)

export const commentTestManager = {
    async getComments(expectedStatusCode: HttpStatusType = HTTP_STATUS.OK, postId: string) {
        debugger
        return getRequest()
            .get(`${URI_PATHS.posts}/${postId + URI_PATHS.comments}`)
            .expect(expectedStatusCode)
    },

    async createComment(data: any,
                        postId: string,
                        expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED,
                        authData: string
    ) {

        return getRequest()
            .post(`${URI_PATHS.posts}/${postId + URI_PATHS.comments}`)
            .set('Authorization', authData)
            .send(data)
            .expect(expectedStatusCode);
    }
}