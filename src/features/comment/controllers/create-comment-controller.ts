import {Response} from "express";
import {RequestWithParamsAndBody} from "../../../types/request-types";
import {CreateCommentType} from "../types/create-comment-type";
import {CommentResponseType} from "../types/comment-response-type";
import {HTTP_STATUS} from "../../../constants/http-status";
import {CommentService} from "../services/comment-service";
import {QueryCommentRepository} from "../repositories/query-comment-repository";

export const createCommentController = async (req: RequestWithParamsAndBody<{
    postId: string
}, CreateCommentType>, res: Response<CommentResponseType>) => {

    const commentData = {...req.body, ...req.params}
    debugger
    const commentId = await CommentService.postNewEntity(commentData)
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