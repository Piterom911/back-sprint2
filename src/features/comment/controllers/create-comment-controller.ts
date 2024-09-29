import {Response} from "express";
import {RequestWithBody} from "../../../types/request-types";
import {CreateCommentType} from "../types/create-comment-type";
import {CommentResponseType} from "../types/comment-response-type";
import {HTTP_STATUS} from "../../../constants/http-status";
import {CommentService} from "../services/comment-service";
import {QueryCommentRepository} from "../repositories/query-comment-repository";

export const createCommentController = async (req: RequestWithBody<CreateCommentType>, res: Response<CommentResponseType>) => {
    const commentId = await CommentService.postNewEntity(req.body)
    if (!commentId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const createdComment = await QueryCommentRepository.getEntityById(commentId)
    if (!createdComment) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    res.status(HTTP_STATUS.CREATED).send(createdComment)
}