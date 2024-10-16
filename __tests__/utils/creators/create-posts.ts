import {URI_PATHS} from "../../../src/constants/uri-paths";
import request from "supertest";
import {app} from "../../../src/app";
import {PostResponseType} from "../../../src/features/post/types/post-response-type";

export const createPosts = async (numberOfPosts: number, blogId: string, authorization: string) => {
    const posts: PostResponseType[] = [];

    for(let i = 1; i <= numberOfPosts; i++) {
        const postResponse = await request(app)
            .post(`${URI_PATHS.blogs}/${blogId + URI_PATHS.posts}`)
            .set("Authorization", authorization)
            .send({
                title: `#${i} Post`,
                shortDescription: `#${i} This is post that belongs to blog ID: ${blogId}`,
                content: `#${i} This post contains a lot of information that can help you do nothing! And it's very...`}
            );

        posts.push(postResponse.body);
    }

    return posts;
}