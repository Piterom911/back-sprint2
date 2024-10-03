import {Response} from "express";
import {RequestWithParamsAndBody} from "../../../types/request-types";
import {HTTP_STATUS} from "../../../constants/http-status";
import {QueryCommentRepository} from "../repositories/query-comment-repository";
import {UpdateCommentType} from "../types/update-comment-type";
import {CommentService} from "../services/comment-service";

export const updateCommentByIdController = async (req: RequestWithParamsAndBody<{
    id: string
}, UpdateCommentType>, res: Response) => {
    const commentId = req.params.id
    const content = req.body.content

    const targetComment = await QueryCommentRepository.getEntityById(commentId)
    if (!targetComment) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    await CommentService.updateEntity(commentId, content)

    res.send(HTTP_STATUS.NO_CONTENT)
}