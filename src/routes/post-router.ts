import {Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {
    HTTP_STATUS,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    ResponseType
} from "../models/common";
import {mongoIdParamValidation} from "../validators/id-param-validator";
import {PostsService} from "../services/post-service";
import {QueryPostInputModel} from "../models/post/input/query-post-input-model";
import {SortPostOutputModel} from "../models/post/output/sort-post-output-model";
import {CreatePostModel} from "../models/post/input/create-post-input-model";
import {PostOutputModel} from "../models/post/output/post-output-model";
import {UpdatePostModel} from "../models/post/input/update-post-input-model";
import {QueryPostRepository} from "../repostitories/query-repositories/post-repository";

export const postRouter = Router({})

postRouter.get('/', async (req: RequestWithQuery<QueryPostInputModel>, res: ResponseType<SortPostOutputModel>) => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const posts = await QueryPostRepository.getAllEntities(sortData)
    res.send(posts)
})
postRouter.get('/:id', mongoIdParamValidation(), async (req: RequestWithParams<{ id: string }>, res: ResponseType<PostOutputModel>) => {
    const id = req.params.id

    const isExistedPost = await QueryPostRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await QueryPostRepository.getEntityById(id)
    if (!targetPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(targetPost)
})
postRouter.post('/', authMiddleware, postValidation(), async (req: RequestWithBody<CreatePostModel>, res: ResponseType<PostOutputModel>) => {
    const postId = await PostsService.postNewEntity(req.body)
    if (!postId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const createdPost = await QueryPostRepository.getEntityById(postId)
    if (!createdPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    res.status(HTTP_STATUS.CREATED).send(createdPost)
})
postRouter.put('/:id', mongoIdParamValidation(), authMiddleware, postValidation(), async (req: RequestWithParamsAndBody<{
    id: string
}, UpdatePostModel>, res: Response) => {
    const id = req.params.id

    const isExistedPost = await QueryPostRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.updateEntity(id, req.body)
    if (!targetPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
})
postRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id

    const isExistedPost = await QueryPostRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.deleteEntity(id)
    if (!targetPost) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
})















