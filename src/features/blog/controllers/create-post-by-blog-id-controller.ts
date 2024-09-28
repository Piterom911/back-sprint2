import {RequestWithParamsAndBody, ResponseType} from "../../../types/request-types";
import {CreatePostBlogModel} from "../types/create-blog-model";
import {PostResponseType} from "../../post/types/post-response-type";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";
import {BlogsService} from "../services/blog-service";
import {QueryPostRepository} from "../../post/repostitories/query-post-repository";
import {HTTP_STATUS} from "../../../constants/http-status";

export const createPostByBlogIdController = async (req: RequestWithParamsAndBody<{
    id: string
}, CreatePostBlogModel>, res: ResponseType<PostResponseType | null>) => {
    const blogId = req.params.id

    const isExistedBlog = await QueryBlogRepository.getEntityById(blogId)
    if (!isExistedBlog) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const createdPostId = await BlogsService.createNewPostToBlogId(blogId, req.body)
    if (!createdPostId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const createdPost = await QueryPostRepository.getEntityById(createdPostId)

    res.status(HTTP_STATUS.CREATED).send(createdPost)
}