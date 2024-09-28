import {HTTP_STATUS, RequestWithParamsAndBody, ResponseType} from "../../../models/common";
import {CreatePostBlogModel} from "../types/create-blog-model";
import {PostOutputModel} from "../../../models/post/output/post-output-model";
import {QueryBlogRepository} from "../../../repostitories/query-repositories/blog-repository";
import {BlogsService} from "../services/blog-service";
import {QueryPostRepository} from "../../../repostitories/query-repositories/post-repository";

export const createPostByBlogIdController = async (req: RequestWithParamsAndBody<{
    id: string
}, CreatePostBlogModel>, res: ResponseType<PostOutputModel | null>) => {
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