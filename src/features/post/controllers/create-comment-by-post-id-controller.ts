import {Response} from "express";
import {RequestWithParamsAndBody} from "../../../types/request-types";
import {CreateCommentBodyType, CreateCommentParamsType} from "../../comment/types/create-comment-type";
import {CommentResponseType} from "../../comment/types/comment-response-type";
import {QueryPostRepository} from "../repositories/query-post-repository";
import {HTTP_STATUS} from "../../../constants/http-status";
import {CommentService} from "../../comment/services/comment-service";
import {QueryCommentRepository} from "../../comment/repositories/query-comment-repository";

export const createCommentByPostIdController = async (req: RequestWithParamsAndBody<CreateCommentParamsType, CreateCommentBodyType>, res: Response<CommentResponseType | null>) => {
    const postId = await QueryPostRepository.getEntityById(req.params.id)
    if (!postId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const commentData = {
        postId: req.params.id,
        content: req.body.content,
        userId: req.userId!.toString(),
    }

    const createdCommentId = await CommentService.postNewEntity(commentData)
    if (!createdCommentId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const newComment = await QueryCommentRepository.getEntityById(createdCommentId)

    res.status(HTTP_STATUS.CREATED).send(newComment)
}