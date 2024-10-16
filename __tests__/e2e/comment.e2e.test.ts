import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";
import {UserResponseType} from "../../src/features/user/types/user-response-type";
import {BlogResponseType} from "../../src/features/blog/types/blog-response-type";
import {PostResponseType} from "../../src/features/post/types/post-response-type";
import {HTTP_STATUS} from "../../src/constants/http-status";
import {commentTestManager} from "../utils/managers/comment-test-manager";
import {CommentResponseType} from "../../src/features/comment/types/comment-response-type";
import {eraseDB} from "../../src/db/db";
import {createUsers} from "../utils/creators/create-users";
import {createBlogs} from "../utils/creators/create-blogs";
import {authenticateUser} from "../utils/creators/authenticate-user";
import {createPosts} from "../utils/creators/create-posts";

describe('Comment endpoints', () => {
    createMongoMemoryServer();

    let startArrayWithNoComment = {
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: []
    }

    let users: UserResponseType[],
        blogs: BlogResponseType[],
        posts: PostResponseType[],
        comment: CommentResponseType,
        accessToken: string

    const authBasic = "Basic YWRtaW46cXdlcnR5";
    const userPassword = "qwerty";

    beforeAll(async () => {
        users = await createUsers(2, authBasic, userPassword)
        accessToken = await authenticateUser({loginOrEmail: users[0].login, password: userPassword})
        blogs = await createBlogs(2, authBasic)
        posts = await createPosts(3, blogs[0].id, authBasic)
    });

    afterAll( ()=> {
        eraseDB();
    })

    it("create a comment", async () => {
        const commentData = {content: "some content that should be here"};
        const commentResponse = await commentTestManager.createComment(commentData, posts[0].id, HTTP_STATUS.CREATED, accessToken)

        comment = commentResponse.body

        expect(comment).toEqual({
            ...commentData,
            id: expect.any(String),
            commentatorInfo: {
                userId: users[0].id,
                userLogin: users[0].login
            },
            createdAt: expect.any(String)
        })
    })

    it("does not create a comment with too short content", async () => {
        const errorObj = {
            errorsMessages: [{message: expect.any(String), field: expect.any(String)}]
        }
        console.log("accessTokenaccessTokenaccessTokenaccessTokenaccessTokenaccessToken", accessToken)

        const commentData = {content: "here"};
        const commentResponse = await commentTestManager.createComment(
            commentData,
            posts[0].id,
            HTTP_STATUS.BAD_REQUEST,
            accessToken
        )

        expect(commentResponse.body).toEqual(errorObj)
    })

    it("does not create a comment with incorrect token", async () => {
        const commentData = {content: "some content that should be here"};
        const commentResponse = await commentTestManager.createComment(
            commentData,
            posts[0].id,
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
        const commentResponse = await commentTestManager.getComments(HTTP_STATUS.OK, posts[0].id)

        expect(commentResponse.body.items[0]).toEqual(comment)
    })
})