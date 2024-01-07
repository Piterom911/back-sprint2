import {Router, Request, Response} from "express";
import {PostsRepository} from "../repositories/posts-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {HTTP_STATUS} from "../models/common";
import {mongoIdParamValidation} from "../validators/id-param-validation";
export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await PostsRepository.getAllEntities()
    res.send(posts)
})
postsRouter.get('/:id', mongoIdParamValidation(), async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsRepository.getEntityById(id)
    if (!targetPost) res.send(HTTP_STATUS.NOT_FOUND)

    res.send(targetPost)
})
postsRouter.post('/', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const postId = await PostsRepository.postNewEntity(req.body)
    if (!postId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const createdPost = await PostsRepository.getEntityById(postId)
    if (!createdPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
    }
    res.status(HTTP_STATUS.CREATED).send(createdPost)
})
postsRouter.put('/:id', mongoIdParamValidation(), authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsRepository.updateEntity(id, req.body)
    if (!targetPost) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
})
postsRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsRepository.deleteEntity(id)
    if (!targetPost) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
})















