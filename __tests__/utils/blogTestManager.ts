import {HTTP_STATUS, HttpStatusType, URI_PATHS} from "../../src/models/common";
import request from "supertest";
import {app} from "../../src/app";

const getRequest = () => request(app)

export const blogTestManager = {
    async createBlog(data: any,
                     expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED,
                     authData: string
    ) {

        const createBlogResponse = await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', authData)
            .send(data)
            .expect(expectedStatusCode)

        return createBlogResponse
    }
}