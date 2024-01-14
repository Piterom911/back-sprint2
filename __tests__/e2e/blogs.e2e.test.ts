import request from 'supertest'
import {app} from "../../src/app";
import {HTTP_STATUS, URI_PATHS} from "../../src/models/common";
import {blogTestManager} from "../utils/blogTestManager";
import {CreatePostBlogModel} from "../../src/models/blog/input/create-blog-input-model";


const getRequest = () => request(app)

describe('Endpoints blogs', () => {

    let noBlogsResponse = {
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: []
    }

    beforeAll(async () => {
        await getRequest().delete(URI_PATHS.tests)
    })

    it('should return status 200 and an empty array', async () => {
        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, noBlogsResponse)
    })

    it('should return status 404 for not existing blog', async () => {
        await getRequest()
            .get(`${URI_PATHS.blogs}/659704e12741c44a25524424`)
            .expect(HTTP_STATUS.NOT_FOUND)
    })

    it('should return 401 status code', async () => {
        await blogTestManager.createBlog({name: "an attempt"}, HTTP_STATUS.UNAUTHORIZED, `Basic YWRtaW46cXdlcnR5asd`)

        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, noBlogsResponse)
    })

    it('should`nt create an object with incorrect blog properties', async () => {
        await blogTestManager.createBlog({name: "an attempt"}, HTTP_STATUS.BAD_REQUEST, `Basic YWRtaW46cXdlcnR5`)

        await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, noBlogsResponse)
    })

    let blogExampleForTests: any = undefined;
    it('should  create an object', async () => {
        const newBlogReqData = {
            isMembership: false,
            name: 'Ein Versuch',
            description: 'Das bin ich',
            websiteUrl: 'https://ZzcQfsPbtTQEQYkCBJogfcQRdWGrh-2vIArtzFwlWbLg7hzm215YimA3LtvxwUdYiB.M4ruVPXLhKE2gQAZM1mShLlLE'
        }

        blogExampleForTests = await blogTestManager.createBlog(newBlogReqData, HTTP_STATUS.CREATED, `Basic YWRtaW46cXdlcnR5`)

        expect(blogExampleForTests.body).toEqual({...newBlogReqData, id: expect.any(String), createdAt: expect.any(String)})

        const responseAllBlogs = await getRequest()
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  ..expect(HTTP_REQUEST_STATUS.OK, [createdVideoObj])

        expect(responseAllBlogs.body.items).toEqual([blogExampleForTests.body])
    })

    it('shouldn\'t  create a post to a specific  Blog id', async () => {
        const newPostReqData: CreatePostBlogModel = {
            title: "",
            content: "",
            shortDescription: ""
        }

        await request(app)
            .post(`${URI_PATHS.blogs}/${blogExampleForTests.body.id}/posts`)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(newPostReqData)
            .expect(HTTP_STATUS.BAD_REQUEST)
    })

    it('should  create a post to a specific  Blog id', async () => {
        const newPostReqData: CreatePostBlogModel = {
            title: "hallo",
            content: "Ohne Content",
            shortDescription: "Das ist eine sehr kurze Description"
        }

        await request(app)
            .post(`${URI_PATHS.blogs}/${blogExampleForTests.body.id}/posts`)
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .send(newPostReqData)
            .expect(HTTP_STATUS.CREATED)
    })

    it('should  return all posts from a specific  Blog id', async () => {

        await request(app)
            .get(`${URI_PATHS.blogs}/${blogExampleForTests.body.id}/posts`)
            .expect(HTTP_STATUS.OK)
    })

    it('should update blog data', async () => {
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

    it('should`nt update blog data', async () => {
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

    it('deletes target blog object', async () => {
        blogExampleForTests = await getRequest()
            .delete(`${URI_PATHS.blogs}/` + blogExampleForTests.body.id )
            .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
            .expect(HTTP_STATUS.NO_CONTENT)

        await request(app)
            .get(URI_PATHS.blogs)
            .expect(HTTP_STATUS.OK, {...noBlogsResponse, items: []})
    })

})