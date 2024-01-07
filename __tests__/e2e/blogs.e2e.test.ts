import request from 'supertest'
import {app} from "../../src/app";
import {HTTP_STATUS, URI_PATHS} from "../../src/models/common";


const getRequest = () => request(app)

describe('Endpoints videos', () => {

    beforeAll(async () => {
        await getRequest().delete(URI_PATHS.tests)
    })

    it('should return status 200 and an empty array', async () => {
        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, [])
    })

    it('should return status 404 for not existing blog', async () => {
        await getRequest()
            .get(`${URI_PATHS.blogs}/659704e12741c44a25524424`)
            .expect(HTTP_STATUS.NOT_FOUND)
    })

    it('should return 401 status code', async () => {
        await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5asd`)
            .send({name: 'An attempt'})
            .expect(HTTP_STATUS.UNAUTHORIZED)

        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, [])
    })

    it('should`nt create an object with incorrect blog properties', async () => {
        await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send({name: 'An attempt'})
            .expect(HTTP_STATUS.BAD_REQUEST)

        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, [])
    })

    let blogExampleForTests: any = undefined;
    it('should  create an object', async () => {
        const newBlogReqData = {
            isMembership: false,
            name: 'Ein Versuch',
            description: 'Das bin ich',
            websiteUrl: 'https://ZzcQfsPbtTQEQYkCBJogfcQRdWGrh-2vIArtzFwlWbLg7hzm215YimA3LtvxwUdYiB.M4ruVPXLhKE2gQAZM1mShLlLE'
        }

        blogExampleForTests = await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(newBlogReqData)
            .expect(HTTP_STATUS.CREATED)

        expect(blogExampleForTests.body).toEqual({...newBlogReqData, id: expect.any(String), createdAt: expect.any(String)})

        const responseAllBlogs = await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  ..expect(HTTP_REQUEST_STATUS.OK, [createdVideoObj])

        expect(responseAllBlogs.body).toEqual([blogExampleForTests.body])
    })

    it('should update video data', async () => {
        const updateBlogReqData = {
            name: 'Ein',
            description: 'Das',
            websiteUrl: 'https://www.shortVeryShort'
        }

        await request(app)
            .put(`${URI_PATHS.blogs}/` + blogExampleForTests.body.id)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(updateBlogReqData)
            .expect(HTTP_STATUS.NO_CONTENT)
    })

    it('should`nt update video data', async () => {
        const updateBlogReqData = {
            websiteUrl: 'https://shortVeryShort'
        }

        const response = await getRequest()
            .put(`${URI_PATHS.blogs}/` + blogExampleForTests.body.id)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(updateBlogReqData)
            .expect(HTTP_STATUS.BAD_REQUEST)

        expect(response.body).toEqual({
            errorsMessages: expect.arrayContaining([{ message: expect.any(String), field: expect.any(String) }])
        })
    })

    it('deletes target video object', async () => {
        blogExampleForTests = await getRequest()
            .delete(`${URI_PATHS.blogs}/` + blogExampleForTests.body.id )
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .expect(HTTP_STATUS.NO_CONTENT)

        await request(app)
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, [])
    })

})