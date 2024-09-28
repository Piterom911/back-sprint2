import {RequestWithParams} from "../../../types/request-types";
import {Response} from "express";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";
import {BlogsService} from "../services/blog-service";
import {HTTP_STATUS} from "../../../constants/http-status";

export const deleteBlogController = async (req: RequestWithParams<{
    id: string
}>, res: Response) => {
    const id = req.params.id

    const isExistedBlog = await QueryBlogRepository.getEntityById(id)
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
}