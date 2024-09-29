import {RequestWithQuery, ResponseType} from "../../../types/request-types";
import {QueryPostModel} from "../types/query-post-model";
import {PostSortResponseType} from "../types/post-sort-response-type";
import {QueryPostRepository} from "../repositories/query-post-repository";

export const getPostsController = async (req: RequestWithQuery<QueryPostModel>, res: ResponseType<PostSortResponseType>) => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const posts = await QueryPostRepository.getAllEntities(sortData)
    res.send(posts)
}