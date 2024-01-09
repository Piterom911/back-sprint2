import {Request, Response, Router} from "express"
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {HTTP_STATUS} from "../models/common";
import {mongoIdParamValidation} from "../validators/id-param-validation";
import {BlogsService} from "../domain/blog-service";
import {OutputBlogType} from "../models/blog/output";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs: OutputBlogType[] = await BlogsService.getAllEntities()
    res.send(blogs)
})
blogsRouter.get('/:id', mongoIdParamValidation(),  async (req: Request, res: Response) => {
    const id = req.params.id

    const targetBlog = await BlogsService.getEntityById(id)
    if (!targetBlog) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(targetBlog)
})
blogsRouter.post('/', authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    const createdBlogId = await BlogsService.postNewEntity(req.body)

    if (!createdBlogId) {
        res.sendStatus(HTTP_STATUS.SERVICE_UNAVAILABLE)
        return
    }

    const createdBlog = await BlogsService.getEntityById(createdBlogId)
    res.status(HTTP_STATUS.CREATED).send(createdBlog)
})
blogsRouter.put('/:id', mongoIdParamValidation(), authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    const id = req.params.id

    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl

    const blog = await BlogsService.getEntityById(id)
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
blogsRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedBlog = await BlogsService.getEntityById(id)
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















