import request from 'supertest'
import {app} from "../../src/app";
import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";
import {blogCollection, postCollection, userCollection} from "../../src/db/db";
import {URI_PATHS} from "../../src/constants/uri-paths";
import {UserResponseType} from "../../src/features/user/types/user-response-type";
import {BlogResponseType} from "../../src/features/blog/types/blog-response-type";
import {PostResponseType} from "../../src/features/post/types/post-response-type";
import {HTTP_STATUS} from "../../src/constants/http-status";
import {commentTestManager} from "../utils/comment-test-manager";
import {CommentResponseType} from "../../src/features/comment/types/comment-response-type";

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

    beforeEach(async () => {
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
            .post(`${URI_PATHS.blogs}/${blog.id}${URI_PATHS.posts}`)
            .set("Authorization", authRight)
            .send({title: 'Test Post', shortDescription: "THis is not what you think", content: 'Post content'});
        post = postResponse.body;
    });

    afterEach(async () => {
        await userCollection.deleteMany()
        await blogCollection.deleteMany()
        await postCollection.deleteMany()
    })

    it("create a comment", async () => {
        const commentData = {content: "some content that should be here"};
        const commentResponse = await commentTestManager.createComment(commentData, post.id, HTTP_STATUS.CREATED, accessToken)

        comment = commentResponse.body
    })
})