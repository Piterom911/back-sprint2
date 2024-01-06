import request from 'supertest'
import {app} from "../src/app";
import {HTTP_REQUEST_STATUS, URI_PATHS} from "../src/models/common";
import {ObjectId} from "mongodb";

const getRequest = () => request(app)

describe('Endpoints posts', () => {
    beforeAll(async () => {
        await getRequest().delete('/testing/all-data')
    })

    it('should return status 200 and an empty array', async () => {
        await getRequest()
            .get(URI_PATHS.posts)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

    it('should return status 404 for not existing post', async () => {
        await getRequest()
            .get(`${URI_PATHS.posts}/659704e12741c44a25524424`)
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
        const newBlogReqData = {
            isMembership: false,
            name: 'Ein Versuch',
            description: 'Das bin ich',
            websiteUrl: 'https://ZzcQfsPbtTQEQYkCBJogfcQRdWGrh-2vIArtzFwlWbLg7hzm215YimA3LtvxwUdYiB.M4ruVPXLhKE2gQAZM1mShLlLE'
        }

        const blogIdForNewPost = await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(newBlogReqData)
            .expect(HTTP_REQUEST_STATUS.CREATED)

        const newPostReqData = {
            title: "SOME TITLE",
            shortDescription: "a very very short description",
            content: "It's a big content fot this small object",
            blogId: blogIdForNewPost.body.id
        }

        postExampleForTests = await getRequest()
            .post(URI_PATHS.posts)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(newPostReqData)
            .expect(HTTP_REQUEST_STATUS.CREATED)

        expect(postExampleForTests.body).toEqual({
            ...newPostReqData,
            id: expect.any(String),
            blogName: expect.any(String),
            createdAt: expect.any(String)
        })
    })

    it('should update post data', async () => {
        const updateBlogReqData = {
            title: "New Title post",
            shortDescription: "new description",
            content: "Now it has no content",
            blogId: postExampleForTests.body.blogId
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