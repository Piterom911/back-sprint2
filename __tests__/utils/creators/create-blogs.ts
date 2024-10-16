import {URI_PATHS} from "../../../src/constants/uri-paths";
import request from "supertest";
import {app} from "../../../src/app";
import {BlogResponseType} from "../../../src/features/blog/types/blog-response-type";

export const createBlogs = async (numberOfBlogs: number, authorization: string) => {
    const blogs: BlogResponseType[] = [];
    for (let i = 1; i <= numberOfBlogs; i++) {
        const blogResponse = await request(app)
            .post(URI_PATHS.blogs)
            .set("Authorization", authorization)
            .send({
                name: `Interesting blog #${i}`,
                description: `#${i}. This blog is about very important thing that should know every partner...`,
                websiteUrl: `https://dogodadev${i}.com`
            });

        blogs.push(blogResponse.body)
    }

    return blogs;
}