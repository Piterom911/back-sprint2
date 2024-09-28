import {HTTP_STATUS, RequestWithParamsAndQuery, ResponseType} from "../../../models/common";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";
import {QueryPostModel} from "../../post/types/query-post-model";
import {PostSortResponseType} from "../../post/types/post-sort-response-type";

export const getPostsByBlogIdController = async (req: RequestWithParamsAndQuery<{
    id: string
}, QueryPostModel>, res: ResponseType<PostSortResponseType>) => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }

    const blogId = req.params.id

    const isExistedBlog = await QueryBlogRepository.getEntityById(blogId)

    if (!isExistedBlog) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const posts: PostSortResponseType = await QueryBlogRepository.getAllPostsByBlogId(blogId, sortData)
    res.send(posts)
}

