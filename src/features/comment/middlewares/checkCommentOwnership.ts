import {NextFunction, Response} from "express";
import {HTTP_STATUS} from "../../../constants/http-status";
import {RequestWithParams} from "../../../types/request-types";
import {QueryCommentRepository} from "../repositories/query-comment-repository";

export const checkCommentOwnership = async (req: RequestWithParams<{
    id: string
}>, res: Response, next: NextFunction) => {
    const {userId} = req;
    const commentId = req.params.id;

    const targetComment = await QueryCommentRepository.getEntityById(commentId)


    if (targetComment?.commentatorInfo.userId !== userId) {
        res.sendStatus(HTTP_STATUS.FORBIDDEN);
        return;
    }

    next();
};