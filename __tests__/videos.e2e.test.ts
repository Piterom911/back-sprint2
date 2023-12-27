import request from 'supertest'
import {VideoCreateModel, VideoUpdateModel} from "../src/models/videos/input";
import {app} from "../src/app";
import {HTTP_REQUEST_STATUS, URI_PATHS} from "../src/models/common";

const getRequest = () => request(app)

describe('Endpoints videos', () => {
    beforeAll(async () => {
        await getRequest().delete(URI_PATHS.tests)
    })

    it('should return status 200 and an empty array', async () => {
        await getRequest()
            .get(URI_PATHS.videos)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

    it('should return status 404 for not existing video', async () => {
        await getRequest()
            .get(`${URI_PATHS.videos}/938475`)
            .expect(HTTP_REQUEST_STATUS.NOT_FOUND)
    })

    it('should`nt create an object with incorrect video properties', async () => {
        await getRequest()
            .post(URI_PATHS.videos)
            .send({title: 'An attempt'})
            .expect(HTTP_REQUEST_STATUS.BAD_REQUEST)

        await getRequest()
            .get(URI_PATHS.videos)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

    let videoExampleForTests: any = undefined;
    it('should  create an object with correct video properties', async () => {
        const newVideoReqData: VideoCreateModel = {
            title: 'Ein Versuch',
            author: 'Das bin ich',
            availableResolutions: ['P144']
        }

        const createdVideoObj = {
            ...newVideoReqData,
            id: expect.any(Number),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String)
        }

        videoExampleForTests = await getRequest()
            .post(URI_PATHS.videos)
            .send(newVideoReqData)
            .expect(HTTP_REQUEST_STATUS.CREATED)   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  .expect(HTTP_REQUEST_STATUS.CREATED, createdVideoObj)

        expect(videoExampleForTests.body).toEqual(createdVideoObj)

        const responseAllVideos = await getRequest()
            .get(URI_PATHS.videos)
            .expect(HTTP_REQUEST_STATUS.OK) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  ..expectHTTP_REQUEST_STATUS.OK, [createdVideoObj])

        expect(responseAllVideos.body).toEqual([createdVideoObj])
    })

    it('should update video data', async () => {
        const updateVideoReqData: VideoUpdateModel = {
            title: 'Put new data to this video object',
            author: 'Of course me',
            availableResolutions: ['P144'],
            canBeDownloaded: true,
            minAgeRestriction: null,
            publicationDate: new Date().toISOString()
        }

        await request(app)
            .put(`${URI_PATHS.videos}/` + videoExampleForTests.body.id)
            .send(updateVideoReqData)
            .expect(HTTP_REQUEST_STATUS.NO_CONTENT)
    })

    it('should`nt update video data', async () => {
        const updateVideoReqData = {
            author: 'Of course me',
        }

        const response = await getRequest()
            .put(`${URI_PATHS.videos}/` + videoExampleForTests.body.id)
            .send(updateVideoReqData)
            .expect(HTTP_REQUEST_STATUS.BAD_REQUEST)

        expect(response.body).toEqual({
            errorsMessages: expect.arrayContaining([{ message: expect.any(String), field: expect.any(String) }])
        })
    })

    it('deletes target video object', async () => {
        videoExampleForTests = await getRequest()
            .delete(`${URI_PATHS.videos}/` + videoExampleForTests.body.id )
            .expect(HTTP_REQUEST_STATUS.NO_CONTENT)

        await request(app)
            .get(URI_PATHS.videos)
            .expect(HTTP_REQUEST_STATUS.OK, [])
    })

})