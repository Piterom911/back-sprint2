import request from 'supertest'
import {app, CreateVideoType} from "../src/settings";

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

        const response = await request(app)
            .post('/videos')
            .send(newVideoReqData)
            .expect(201)   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  .expect(201, createdVideoObj)

        expect(response.body).toEqual(createdVideoObj)

        const responseAllVideos = await request(app)
            .get('/videos')
            .expect(200) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  ..expect(200, [createdVideoObj])

        expect(responseAllVideos.body).toEqual([createdVideoObj])
    })


})