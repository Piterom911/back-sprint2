import {HTTP_STATUS, RequestWithParamsAndBody} from "../../../models/common";
import {UpdateBlogModel} from "../types/update-blog-model";
import {Response} from "express";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";
import {BlogsService} from "../services/blog-service";

export const updateBlogController = async (req: RequestWithParamsAndBody<{ id: string }, UpdateBlogModel>, res: Response) => {
    const id = req.params.id

    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl

    const blog = await QueryBlogRepository.getEntityById(id)
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
}