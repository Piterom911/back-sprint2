import {Router, Request, Response} from "express";
import {PostsRepository} from "../repositories/posts-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {HTTP_REQUEST_STATUS} from "../models/common";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = PostsRepository.getAllEntities()
    res.send(posts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(HTTP_REQUEST_STATUS.BAD_REQUEST)

    const targetPost = PostsRepository.getEntityById(id)
    if (!targetPost) res.send(HTTP_REQUEST_STATUS.NOT_FOUND)

    res.send(targetPost)
})
postsRouter.post('/', authMiddleware, postValidation(), (req: Request, res: Response) => {
    const result = PostsRepository.postNewEntity(req.body)
    res.status(HTTP_REQUEST_STATUS.CREATED).send(result)
})
postsRouter.put('/:id', authMiddleware, postValidation(), (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(HTTP_REQUEST_STATUS.UNAUTHORIZED)

    const targetPost = PostsRepository.updateEntity(id, req.body)
    if (!targetPost) res.send(HTTP_REQUEST_STATUS.NOT_FOUND)

    res.send(HTTP_REQUEST_STATUS.NO_CONTENT)
})
postsRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(HTTP_REQUEST_STATUS.UNAUTHORIZED)

    const targetBlog = PostsRepository.deleteEntity(id)
    if (!targetBlog) res.send(HTTP_REQUEST_STATUS.NOT_FOUND)

    res.send(HTTP_REQUEST_STATUS.NO_CONTENT)
})















