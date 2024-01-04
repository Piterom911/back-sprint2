import {Router, Request, Response} from "express"
import {BlogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {ObjectId} from "mongodb";
import {HTTP_REQUEST_STATUS} from "../models/common";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs = await BlogsRepository.getAllEntities()
    res.send(blogs)
})
blogsRouter.get('/:id',  async (req: Request, res: Response) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.send(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    const targetBlog = await BlogsRepository.getEntityById(id)
    if (!targetBlog) res.send(HTTP_REQUEST_STATUS.NOT_FOUND)

    res.send(targetBlog)
})
blogsRouter.post('/', authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    const createdBlogId = await BlogsRepository.postNewEntity(req.body)

    if (!createdBlogId) {
        res.sendStatus(HTTP_REQUEST_STATUS.SERVICE_UNAVAILABLE)
        return
    }

    const createdBlog = await BlogsRepository.getEntityById(createdBlogId)
    res.status(HTTP_REQUEST_STATUS.CREATED).send(createdBlog)
})
blogsRouter.put('/:id', authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl

    const blog = await BlogsRepository.getEntityById(id)
    if (!blog) {
        res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND)
    }

    const targetBlog = await BlogsRepository.updateEntity(id, {name, description, websiteUrl})
    if (!targetBlog) {
        res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    res.sendStatus(HTTP_REQUEST_STATUS.NO_CONTENT)
})
blogsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) {
        res.send(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    const targetBlog = await BlogsRepository.deleteEntity(id)
    if (!targetBlog) {
        res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND);
        return
    }

    res.sendStatus(HTTP_REQUEST_STATUS.NO_CONTENT)
})















