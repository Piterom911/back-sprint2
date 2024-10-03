import {Response} from "express";
import {RequestWithParams} from "../../../types/request-types";
import {QueryCommentRepository} from "../repositories/query-comment-repository";
import {HTTP_STATUS} from "../../../constants/http-status";
import {CommandCommentRepository} from "../repositories/command-comment-repository";

export const deleteCommentByIdController = async (req: RequestWithParams<{ commentId: string }>, res: Response) => {
    const targetComment = await QueryCommentRepository.getEntityById(req.params.commentId)

    if (!targetComment) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    if (targetComment.commentatorInfo.userId !== req.userId) {
        res.sendStatus(HTTP_STATUS.FORBIDDEN)
        return
    }

    await CommandCommentRepository.deleteEntity(req.params.commentId)
    res.sendStatus(HTTP_STATUS.NO_CONTENT)
}