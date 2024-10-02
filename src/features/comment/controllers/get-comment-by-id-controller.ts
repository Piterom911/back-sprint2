import {QueryCommentRepository} from "../repositories/query-comment-repository";
import {RequestWithParams, ResponseType} from "../../../types/request-types";
import {HTTP_STATUS} from "../../../constants/http-status";
import {CommentResponseType} from "../types/comment-response-type";

export const getCommentByIdController = async (req: RequestWithParams<{ commentId: string }>, res: ResponseType<CommentResponseType | null>) => {

    const comment = await QueryCommentRepository.getEntityById(req.params.commentId)

    if (!comment) res.sendStatus(HTTP_STATUS.NOT_FOUND)

    res.status(HTTP_STATUS.OK).send(comment)
};