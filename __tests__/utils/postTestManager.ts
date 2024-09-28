import request from "supertest";
import {app} from "../../src/app";
import {HTTP_STATUS, HttpStatusType} from "../../src/constants/http-status";
import {URI_PATHS} from "../../src/constants/uri-paths";

const getRequest = () => request(app)

export const postTestManager = {
    async createPost(data: any,
                     expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED,
                     authData: string
    ) {

        return getRequest()
            .post(URI_PATHS.posts)
            .set('Authorization', authData)
            .send(data)
            .expect(expectedStatusCode);
    }
}