// import request from 'supertest'
// import {VideoCreateModel, VideoUpdateModel} from "../src/models/videos/input";
// import {app} from "../src/app";
//
// const getRequest = () => request(app)
//
// describe('Check "/blogs" endpoint', () => {
//     beforeAll(async () => {
//         await request(app).delete('/testing/all-data')
//     })
//
//     it('should return status-code 200 and an empty array', async () => {
//         await request(app)
//             .get('/blogs')
//             .expect(200, [])
//     })
//
//     it('should return status 404 for not existing blogs', async () => {
//         await request(app)
//             .get('/blogs/938475')
//             .expect(404)
//     })
//
//     it('should`nt create an object with incorrect video properties', async () => {
//         await request(app)
//             .post('/videos')
//             .send({title: 'An attempt'})
//             .expect(400)
//
//         await request(app)
//             .get('/videos')
//             .expect(200, [])
//     })
//
//     let videoExampleForTests: any = undefined;
//     it('should  create an object with correct video properties', async () => {
//         const newVideoReqData: VideoCreateModel = {
//             title: 'Ein Versuch',
//             author: 'Das bin ich',
//             availableResolutions: ['P144']
//         }
//
//         const createdVideoObj = {
//             ...newVideoReqData,
//             id: expect.any(Number),
//             canBeDownloaded: false,
//             minAgeRestriction: null,
//             createdAt: expect.any(String),
//             publicationDate: expect.any(String)
//         }
//
//         videoExampleForTests = await request(app)
//             .post('/videos')
//             .send(newVideoReqData)
//             .expect(201)   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  .expect(201, createdVideoObj)
//
//         expect(videoExampleForTests.body).toEqual(createdVideoObj)
//
//         const responseAllVideos = await request(app)
//             .get('/videos')
//             .expect(200) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  ..expect(200, [createdVideoObj])
//
//         expect(responseAllVideos.body).toEqual([createdVideoObj])
//     })
//
//     it('should update video data', async () => {
//         const updateVideoReqData: VideoUpdateModel = {
//             title: 'Put new data to this video object',
//             author: 'Of course me',
//             availableResolutions: ['P144'],
//             canBeDownloaded: true,
//             minAgeRestriction: null,
//             publicationDate: new Date().toISOString()
//         }
//
//         await request(app)
//             .put('/videos/' + videoExampleForTests.body.id)
//             .send(updateVideoReqData)
//             .expect(204)
//     })
//
//     it('should`nt update video data', async () => {
//         const updateVideoReqData = {
//             author: 'Of course me',
//         }
//
//         const response = await request(app)
//             .put('/videos/' + videoExampleForTests.body.id)
//             .send(updateVideoReqData)
//             .expect(400)
//
//         expect(response.body).toEqual({
//             errorsMessages: expect.arrayContaining([{ message: expect.any(String), field: expect.any(String) }])
//         })
//     })
//
//     it('deletes target video object', async () => {
//         videoExampleForTests = await request(app)
//             .delete('/videos/' + videoExampleForTests.body.id )
//             .expect(204)
//
//         await request(app)
//             .get('/videos')
//             .expect(200, [])
//     })
//
// })