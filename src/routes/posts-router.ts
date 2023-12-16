import {Router, Request, Response} from "express";
import {PostsRepository} from "../repositories/posts-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = PostsRepository.getAllEntities()
    res.send(posts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(400)

    const targetPost = PostsRepository.getEntityById(id)
    if (!targetPost) res.send(404)

    res.send(targetPost)
})
postsRouter.post('/', authMiddleware, postValidation(), (req: Request, res: Response) => {
    const result = PostsRepository.postNewEntity(req.body)
    res.status(201).send(result)
})
postsRouter.put('/:id', authMiddleware, postValidation(), (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(401)

    const targetPost = PostsRepository.updateEntity(id, req.body)
    if (!targetPost) res.send(404)

    res.send(204)
})
postsRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(401)

    const targetBlog = PostsRepository.deleteEntity(id)
    if (!targetBlog) res.send(404)

    res.send(204)
})















