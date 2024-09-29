import {QueryCommentRepository} from "../repositories/query-comment-repository";
import {RequestWithQuery, ResponseType} from "../../../types/request-types";
import {QueryCommentModel} from "../types/query-comment-model";
import {CommentSortResponseType} from "../types/comment-sort-response-type";

export const getAllCommentsController = async (req: RequestWithQuery<QueryCommentModel>, res: ResponseType<CommentSortResponseType>) => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const posts = await QueryCommentRepository.getAllEntities(sortData)
    res.send(posts)
};