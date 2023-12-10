import request from 'supertest'
import {app} from "../src/settings";
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
        const response = await request(app)
            .post('/videos')
            .send({title: 'An attempt'})
            .expect(400)

        await request(app)
            .get('/videos')
            .expect(200, [])
    })



})