import request from 'supertest'
import {app} from "../src/app";
import {HTTP_REQUEST_STATUS, URI_PATHS} from "../src/models/common";

const getRequest = () => request(app)

describe('Endpoints posts', () => {
    let token: any

    beforeAll(async () => {
        await getRequest().delete(URI_PATHS.tests)
    })

    it('should return status 200 and an empty array', async () => {
        await getRequest()
            .get(URI_PATHS.posts)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

    it('should return status 404 for not existing post', async () => {
        await getRequest()
            .get(`${URI_PATHS.posts}/938475`)
            .expect(HTTP_REQUEST_STATUS.NOT_FOUND)
    })

    it('should return 401 status code', async () => {
        await getRequest()
            .post(URI_PATHS.posts)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5asd`)
            .send({title: 'An attempt'})
            .expect(HTTP_REQUEST_STATUS.UNAUTHORIZED)

        await getRequest()
            .get(URI_PATHS.posts)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

    it('should`nt create an object with incorrect post properties', async () => {
        await getRequest()
            .post(URI_PATHS.posts)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send({title: 'An attempt'})
            .expect(HTTP_REQUEST_STATUS.BAD_REQUEST)

        await getRequest()
            .get(URI_PATHS.posts)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

    let postExampleForTests: any = undefined;
    it('should  create an object with correct post properties', async () => {
        const newPostReqData = {
            id: "someID",
            title: "SOME GRATE TITLE",
            shortDescription: "a very very short description",
            content: "It's a big content fot this small object",
            blogId: "someBlogID",
            blogName: "This must be a blog name"
        }

        postExampleForTests = await getRequest()
            .post(URI_PATHS.posts)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(newPostReqData)
            .expect(HTTP_REQUEST_STATUS.CREATED)

        expect(postExampleForTests.body).toEqual({
            ...newPostReqData,
            id: expect.any(String),
            blogName: expect.any(String)
        })
    })

    it('should update post data', async () => {
        const updateBlogReqData = {
            title: "New Title for this post",
            shortDescription: "And this is a new description",
            content: "Now it has no content",
            blogId: "someBlogID2"
        }

        await request(app)
            .put(`${URI_PATHS.posts}/` + postExampleForTests.body.id)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(updateBlogReqData)
            .expect(HTTP_REQUEST_STATUS.NO_CONTENT)
    })

    it('should`nt update post data', async () => {
        const updateBlogReqData = {
            shortDescription: 'https://shortVeryShort'
        }

        const response = await getRequest()
            .put(`${URI_PATHS.posts}/` + postExampleForTests.body.id)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(updateBlogReqData)
            .expect(HTTP_REQUEST_STATUS.BAD_REQUEST)

        expect(response.body).toEqual({
            errorsMessages: expect.arrayContaining([{ message: expect.any(String), field: expect.any(String) }])
        })
    })

    it('deletes target video object', async () => {
        postExampleForTests = await getRequest()
            .delete(`${URI_PATHS.posts}/` + postExampleForTests.body.id )
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .expect(HTTP_REQUEST_STATUS.NO_CONTENT)

        await request(app)
            .get(URI_PATHS.posts)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

})