import {Router, Request, Response} from "express"
import {BlogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";

export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = BlogsRepository.getAllEntities()
    res.send(blogs)
})
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(400)

    const targetBlog = BlogsRepository.getEntityById(id)
    if (!targetBlog) res.send(404)

    res.send(targetBlog)
})
blogsRouter.post('/', authMiddleware, blogValidation(), (req: Request, res: Response) => {
    const result = BlogsRepository.postNewEntity(req.body)
    res.sendStatus(201).json(result)
})
blogsRouter.put('/:id', authMiddleware, blogValidation(), (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(401)

    const targetBlog = BlogsRepository.updateEntity(id, req.body)
    if (!targetBlog) res.send(404)

    res.send(204)
})
blogsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(401)

    const targetBlog = BlogsRepository.deleteEntity(id)
    if (!targetBlog) res.send(404)

    res.send(204)
})















