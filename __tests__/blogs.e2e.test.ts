import request from 'supertest'
import {app} from "../src/app";
import {URI_PATHS} from "../src/models/common";
import any = jasmine.any;

const getRequest = () => request(app)

describe('Endpoints videos', () => {
    let token: any

    beforeAll(async () => {
        await getRequest().delete(URI_PATHS.tests)
    })

    it('should return status 200 and an empty array', async () => {
        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(200, [])
    })

    it('should return status 404 for not existing blog', async () => {
        await getRequest()
            .get(`${URI_PATHS.blogs}/938475`)
            .expect(404)
    })

    it('should return 401 status code', async () => {
        await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5asd`)
            .send({name: 'An attempt'})
            .expect(401)

        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(200, [])
    })

    it('should`nt create an object with incorrect blog properties', async () => {
        await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send({name: 'An attempt'})
            .expect(400)

        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(200, [])
    })

    let blogExampleForTests: any = undefined;
    it('should  create an object with correct video properties', async () => {
        const newBlogReqData = {
            name: 'Ein Versuch',
            description: 'Das bin ich',
            websiteUrl: 'https://ZzcQfsPbtTQEQYkCBJogfcQRdWGrh-2vIArtzFwlWbLg7hzm215YimA3LtvxwUdYiB.M4ruVPXLhKE2gQAZM1mShLlLE'
        }

        blogExampleForTests = await getRequest()
            .post(URI_PATHS.blogs)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(newBlogReqData)
            .expect(201)

        expect(blogExampleForTests.body).toEqual({...newBlogReqData, id: expect.any(String)})

        const responseAllBlogs = await getRequest()
            .get(URI_PATHS.blogs)
            .expect(200) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  ..expect(200, [createdVideoObj])

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
            .expect(204)
    })

    it('should`nt update video data', async () => {
        const updateBlogReqData = {
            websiteUrl: 'https://shortVeryShort'
        }

        const response = await getRequest()
            .put(`${URI_PATHS.blogs}/` + blogExampleForTests.body.id)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(updateBlogReqData)
            .expect(400)

        expect(response.body).toEqual({
            errorsMessages: expect.arrayContaining([{ message: expect.any(String), field: expect.any(String) }])
        })
    })

    it('deletes target video object', async () => {
        blogExampleForTests = await getRequest()
            .delete(`${URI_PATHS.blogs}/` + blogExampleForTests.body.id )
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .expect(204)

        await request(app)
            .get(URI_PATHS.blogs)
            .expect(200, [])
    })

})