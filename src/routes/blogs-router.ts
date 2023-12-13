import {Router, Request, Response} from "express"
import {BlogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";

export const blogsRouter = Router({})

blogsRouter.get('/', (res: Response, req: Request) => {
    const blogs = BlogsRepository.getAllBlogs()
    res.send(blogs)
})
blogsRouter.get('/:id', (res: Response, req: Request) => {
    const id = req.params.id
    if (!id) res.send(400)

    const targetBlog = BlogsRepository.getBlogById(id)
    if (!targetBlog) res.send(404)

    res.send(targetBlog)
})
blogsRouter.post('/', authMiddleware, (res: Response, req: Request) => {
    const id = req.params.id
    if (!id) res.send(401)

    const targetBlog = BlogsRepository.getBlogById(id)
    if (!targetBlog) res.send(404)

    res.send(targetBlog)
})