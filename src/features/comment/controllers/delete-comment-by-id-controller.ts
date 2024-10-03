import {Response} from "express";
import {RequestWithParams} from "../../../types/request-types";
import {QueryCommentRepository} from "../repositories/query-comment-repository";
import {HTTP_STATUS} from "../../../constants/http-status";
import {CommandCommentRepository} from "../repositories/command-comment-repository";

export const deleteCommentByIdController = async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const targetComment = await QueryCommentRepository.getEntityById(req.params.id)

    if (!targetComment) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    await CommandCommentRepository.deleteEntity(req.params.id)
    res.sendStatus(HTTP_STATUS.NO_CONTENT)
}