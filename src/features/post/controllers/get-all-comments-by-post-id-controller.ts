import {RequestWithParamsAndQuery, ResponseType} from "../../../types/request-types";
import {QueryCommentModel} from "../../comment/types/query-comment-model";
import {CommentSortResponseType} from "../../comment/types/comment-sort-response-type";
import {QueryCommentRepository} from "../../comment/repositories/query-comment-repository";
import {HTTP_STATUS} from "../../../constants/http-status";

export const getAllCommentsByPostIdController = async (req: RequestWithParamsAndQuery<{id: string},QueryCommentModel>, res: ResponseType<CommentSortResponseType>) => {
    const sortData = {
        postId: req.params.id,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const posts = await QueryCommentRepository.getAllEntities(sortData)
    if (posts.items.length == 0) return res.sendStatus(HTTP_STATUS.NOT_FOUND)

    return res.send(posts)
};