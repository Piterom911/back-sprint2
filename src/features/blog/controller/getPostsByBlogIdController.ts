import {HTTP_STATUS, RequestWithParamsAndQuery, ResponseType} from "../../../models/common";
import {QueryBlogRepository} from "../../../repostitories/query-repositories/blog-repository";
import {QueryPostInputModel} from "../../../models/post/input/query-post-input-model";
import {SortPostOutputModel} from "../../../models/post/output/sort-post-output-model";

export const getPostsByBlogIdController = async (req: RequestWithParamsAndQuery<{
    id: string
}, QueryPostInputModel>, res: ResponseType<SortPostOutputModel>) => {
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

    const posts: SortPostOutputModel = await QueryBlogRepository.getAllPostsByBlogId(blogId, sortData)
    res.send(posts)
}

