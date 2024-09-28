import {HTTP_STATUS, RequestWithParamsAndBody} from "../../../models/common";
import {QueryPostRepository} from "../repostitories/query-post-repository";
import {UpdatePostModel} from "../types/update-post-model";
import {Response} from "express";
import {PostsService} from "../services/post-service";

export const updatePostController = async (req: RequestWithParamsAndBody<{
    id: string
}, UpdatePostModel>, res: Response) => {
    const id = req.params.id

    const isExistedPost = await QueryPostRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.updateEntity(id, req.body)
    if (!targetPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
}