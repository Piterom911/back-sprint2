import request from "supertest";
import {app} from "../../../src/app";
import {HTTP_STATUS, HttpStatusType} from "../../../src/constants/http-status";
import {URI_PATHS} from "../../../src/constants/uri-paths";

const getRequest = () => request(app)

export const blogTestManager = {
    async createBlog(data: any,
                     expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED,
                     authData: string
    ) {

        return getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', authData)
            .send(data)
            .expect(expectedStatusCode);
    }
}