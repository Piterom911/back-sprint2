import {Response, Router} from "express"
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {
    HTTP_STATUS,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithParamsAndQuery,
    RequestWithQuery,
    ResponseType
} from "../models/common";
import {mongoIdParamValidation, mongoIDValidation} from "../validators/id-param-validation";
import {BlogsService} from "../services/blog-service";
import {QueryBlogInputModel} from "../models/blog/input/query-blog-input-model";
import {SortBlogOutputModel} from "../models/blog/output/sort-blog-output-model";
import {BlogOutputModel} from "../models/blog/output/blog-output-model";
import {CreateBlogModel, CreatePostBlogModel} from "../models/blog/input/create-blog-input-model";
import {PostOutputModel} from "../models/post/output/post-output-model";
import {postToBlogValidation} from "../validators/post-to-blog-validator";
import {QueryPostInputModel} from "../models/post/input/query-post-input-model";
import {SortPostOutputModel} from "../models/post/output/sort-post-output-model";
import {UpdateBlogModel} from "../models/blog/input/update-blog-input-model";
import {QueryBlogRepository} from "../repostitories/query-repositories/blog-repository";
import {QueryPostRepository} from "../repostitories/query-repositories/post-repository";

export const blogRouter = Router({})

blogRouter.get('/', async (req: RequestWithQuery<QueryBlogInputModel>, res: ResponseType<SortBlogOutputModel>) => {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const bloggers: SortBlogOutputModel = await QueryBlogRepository.getAllEntities(sortData)
    res.send(bloggers)
})
blogRouter.get('/:id', mongoIdParamValidation(), async (req: RequestWithParams<{
    id: string
}>, res: ResponseType<BlogOutputModel | number>) => {
    const id = req.params.id

    const targetBlog = await QueryBlogRepository.getEntityById(id)
    if (!targetBlog) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(targetBlog)
})
blogRouter.get('/:id/posts', async (req: RequestWithParamsAndQuery<{
    id: string
}, QueryPostInputModel>, res: ResponseType<SortPostOutputModel>) => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }

    const blogId = req.params.id

    const isExistedBlog = await QueryBlogRepository.getEntityById(blogId)

    if (!isExistedBlog) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const posts: SortPostOutputModel = await QueryBlogRepository.getAllPostsByBlogId(blogId, sortData)
    res.send(posts)
})
blogRouter.post('/', authMiddleware, blogValidation(), async (req: RequestWithBody<CreateBlogModel>, res: ResponseType<BlogOutputModel | null>) => {
    const createdBlogId = await BlogsService.postNewEntity(req.body)

    if (!createdBlogId) {
        res.sendStatus(HTTP_STATUS.SERVICE_UNAVAILABLE)
        return
    }

    const createdBlog = await QueryBlogRepository.getEntityById(createdBlogId)
    res.status(HTTP_STATUS.CREATED).send(createdBlog)
})
blogRouter.post('/:id/posts', authMiddleware, mongoIDValidation, postToBlogValidation(), async (req: RequestWithParamsAndBody<{
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
})
blogRouter.put(
    '/:id',
    mongoIdParamValidation(),
    authMiddleware,
    blogValidation(),
    async (req: RequestWithParamsAndBody<{ id: string }, UpdateBlogModel>, res: Response) => {
        const id = req.params.id

        const name = req.body.name
        const description = req.body.description
        const websiteUrl = req.body.websiteUrl

        const blog = await QueryBlogRepository.getEntityById(id)
        if (!blog) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND)
            return
        }

        const targetBlog = await BlogsService.updateEntity(id, {name, description, websiteUrl})
        if (!targetBlog) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND)
            return
        }

        res.sendStatus(HTTP_STATUS.NO_CONTENT)
    })
blogRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id

    const isExistedBlog = await QueryBlogRepository.getEntityById(id)
    if (!isExistedBlog) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const targetBlog = await BlogsService.deleteEntity(id)
    if (!targetBlog) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND);
        return
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT)
})















