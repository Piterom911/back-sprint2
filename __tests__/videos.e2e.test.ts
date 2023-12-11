import request from 'supertest'
import {app, CreateVideoType, UpdateVideoType} from "../src/settings";

describe('/videos', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return status 200 and an empty array', async () => {
        await request(app)
            .get('/videos')
            .expect(200, [])
    })

    it('should return status 404 for not existing video', async () => {
        await request(app)
            .get('/videos/938475')
            .expect(404)
    })

    it('should`nt create an object with correct video properties', async () => {
        await request(app)
            .post('/videos')
            .send({title: 'An attempt'})
            .expect(400)

        await request(app)
            .get('/videos')
            .expect(200, [])
    })

    let responseCreatedVideo: any = undefined;
    it('should  create an object with correct video properties', async () => {
        const newVideoReqData: CreateVideoType = {
            title: 'Ein Versuch',
            author: 'Das bin ich',
            availableResolutions: ['P144']
        }

        const createdVideoObj = {
            ...newVideoReqData,
            id: expect.any(Number),
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String)
        }

        responseCreatedVideo = await request(app)
            .post('/videos')
            .send(newVideoReqData)
            .expect(201)   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  .expect(201, createdVideoObj)

        expect(responseCreatedVideo.body).toEqual(createdVideoObj)

        const responseAllVideos = await request(app)
            .get('/videos')
            .expect(200) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  ..expect(200, [createdVideoObj])

        expect(responseAllVideos.body).toEqual([createdVideoObj])
    })

    it('should update video data', async () => {
        const updateVideoReqData: UpdateVideoType = {
            title: 'Put new data to this video object',
            author: 'Of course me',
            availableResolutions: ['P144'],
            canBeDownloaded: true,
            minAgeRestriction: null,
            publicationDate: new Date()
        }

        await request(app)
            .put('/videos/' + responseCreatedVideo.body.id)
            .send(updateVideoReqData)
            .expect(204)
    })

    it('should`nt update video data', async () => {
        const updateVideoReqData = {
            author: 'Of course me',
        }

        const response = await request(app)
            .put('/videos/' + responseCreatedVideo.body.id)
            .send(updateVideoReqData)
            .expect(400)
        console.log(response.body)
        expect(response.body).toEqual({
            errorMessages: expect.arrayContaining([{ message: expect.any(String), field: expect.any(String) }])
        })
    })

})