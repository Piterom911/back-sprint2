import {Response} from "express";
import {RequestWithParams} from "../../../types/request-types";
import {CommentResponseType} from "../types/comment-response-type";
import {HTTP_STATUS} from "../../../constants/http-status";
import {QueryCommentRepository} from "../repositories/query-comment-repository";

export const updateCommentByIdController = async (req: RequestWithParams<{ commentId: string }>, res: Response<CommentResponseType>) => {

    const comment = await QueryCommentRepository.getEntityById(req.params.commentId)
    if (!comment) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    res.status(HTTP_STATUS.CREATED).send(comment)
}