import {Router, Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {HTTP_STATUS, RequestWithQuery, ResponseType} from "../models/common";
import {mongoIdParamValidation} from "../validators/id-param-validation";
import {PostsService} from "../domain/post-service";
import {PostRepository} from "../repositories/post-repository";
import {QueryPostInputModel} from "../models/post/input/query-post-input-model";
import {SortPostOutputModel} from "../models/post/output/sort-post-output-model";
export const postRouter = Router({})

postRouter.get('/', async (req: RequestWithQuery<QueryPostInputModel>, res: ResponseType<SortPostOutputModel>) => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const posts = await PostRepository.getAllEntities(sortData)
    res.send(posts)
})
postRouter.get('/:id', mongoIdParamValidation(), async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsService.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.getEntityById(id)
    if (!targetPost) res.send(HTTP_STATUS.NOT_FOUND)

    res.send(targetPost)
})
postRouter.post('/', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const postId = await PostsService.postNewEntity(req.body)
    if (!postId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const createdPost = await PostsService.getEntityById(postId)
    if (!createdPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
    }
    res.status(HTTP_STATUS.CREATED).send(createdPost)
})
postRouter.put('/:id', mongoIdParamValidation(), authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsService.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.updateEntity(id, req.body)
    if (!targetPost) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
})
postRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsService.getEntityById(id)
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















