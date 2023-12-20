import {Router, Request, Response} from "express"
import {BlogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {ObjectId} from "mongodb";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs = await BlogsRepository.getAllEntities()
    res.send(blogs)
})
blogsRouter.get('/:id',  async (req: Request, res: Response) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.send(404)
        return
    }

    const targetBlog = await BlogsRepository.getEntityById(id)
    if (!targetBlog) res.send(404)

    res.send(targetBlog)
})
blogsRouter.post('/', authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    const result = await BlogsRepository.postNewEntity(req.body)
    res.status(201).send(result)
})
blogsRouter.put('/:id', authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.sendStatus(404)
        return
    }

    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl

    const blog = await BlogsRepository.getEntityById(id)
    if (!blog) {
        res.sendStatus(404)
    }

    const targetBlog = await BlogsRepository.updateEntity(id, {name, description, websiteUrl})
    if (!targetBlog) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)
})
blogsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.send(404)
        return
    }

    const targetBlog = await BlogsRepository.deleteEntity(id)
    if (!targetBlog) {
        res.sendStatus(404);
        return
    }

    res.sendStatus(204)
})















