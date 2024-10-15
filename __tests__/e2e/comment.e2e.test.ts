import request from 'supertest'
import {app} from "../../src/app";
import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";
import {URI_PATHS} from "../../src/constants/uri-paths";
import {UserResponseType} from "../../src/features/user/types/user-response-type";
import {BlogResponseType} from "../../src/features/blog/types/blog-response-type";
import {PostResponseType} from "../../src/features/post/types/post-response-type";
import {HTTP_STATUS} from "../../src/constants/http-status";
import {commentTestManager} from "../utils/comment-test-manager";
import {CommentResponseType} from "../../src/features/comment/types/comment-response-type";
import {eraseDB} from "../../src/db/db";

const getRequest = () => request(app)

describe('Comment endpoints', () => {
    createMongoMemoryServer();

    let startArrayWithNoComment = {
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: []
    }

    let user: UserResponseType,
        blog: BlogResponseType,
        post: PostResponseType,
        comment: CommentResponseType,
        accessToken: string

    const authRight = `Basic YWRtaW46cXdlcnR5`;

    beforeAll(async () => {
        // 1. User creation
        const userResponse = await getRequest()
            .post(URI_PATHS.users)
            .set("Authorization", authRight)
            .send({login: "Roman", email: "roman@gamil.com", password: "qwerty",});
        user = userResponse.body;

        // 2. Auth
        const auth = await getRequest()
            .post(`${URI_PATHS.auth}/login`)
            .send({loginOrEmail: "Roman", password: "qwerty"})
        accessToken = `Bearer ${auth.body.accessToken}`

        // 3. Blog creation
        const blogResponse = await getRequest()
            .post(URI_PATHS.blogs)
            .set("Authorization", authRight)
            .send({name: "Obout me", description: "I am Grut", websiteUrl: "https://dogodadev.com"});
        blog = blogResponse.body;

        // 4. Post creation
        const postResponse = await getRequest()
            .post(`${URI_PATHS.blogs}/${blog.id + URI_PATHS.posts}`)
            .set("Authorization", authRight)
            .send({title: 'Test Post', shortDescription: "THis is not what you think", content: 'Post content'});
        post = postResponse.body;
    });

    afterAll( ()=> {
        eraseDB();
    })

    it("create a comment", async () => {
        const commentData = {content: "some content that should be here"};
        const commentResponse = await commentTestManager.createComment(commentData, post.id, HTTP_STATUS.CREATED, accessToken)

        comment = commentResponse.body

        expect(comment).toEqual({
            ...commentData,
            id: expect.any(String),
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            createdAt: expect.any(String)
        })
    })

    it("does not create a comment with too short content", async () => {
        const errorObj = {
            errorsMessages: [{message: expect.any(String), field: expect.any(String)}]
        }

        const commentData = {content: "here"};
        const commentResponse = await commentTestManager.createComment(
            commentData,
            post.id,
            HTTP_STATUS.BAD_REQUEST,
            accessToken
        )

        expect(commentResponse.body).toEqual(errorObj)
    })

    it("does not create a comment with incorrect token", async () => {
        const commentData = {content: "some content that should be here"};
        const commentResponse = await commentTestManager.createComment(
            commentData,
            post.id,
            HTTP_STATUS.UNAUTHORIZED,
            accessToken + "incorrect token!!!"
        )

        expect(commentResponse.body).toEqual({})
    })

    it("does not create a comment with incorrect post ID", async () => {
        const commentData = {content: "some content that should be here"};
        const commentResponse = await commentTestManager.createComment(
            commentData,
            "6500d10082dbe6d9f6207001",
            HTTP_STATUS.NOT_FOUND,
            accessToken
        )

        expect(commentResponse.body).toEqual({})
    })

    it("returns created comment", async () => {
        const commentResponse = await commentTestManager.getComments(HTTP_STATUS.OK, post.id)

        expect(commentResponse.body.items[0]).toEqual(comment)
    })
})