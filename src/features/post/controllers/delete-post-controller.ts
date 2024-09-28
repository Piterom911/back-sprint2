import {RequestWithParams} from "../../../types/request-types";
import {QueryPostRepository} from "../repostitories/query-post-repository";
import {Response} from "express";
import {PostsService} from "../services/post-service";
import {HTTP_STATUS} from "../../../constants/http-status";

export const deletePostController = async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id

    const isExistedPost = await QueryPostRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.deleteEntity(id)
    if (!targetPost) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
}