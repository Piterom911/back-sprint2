import {HTTP_STATUS, RequestWithParams, ResponseType} from "../../../models/common";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";
import {BlogResponseType} from "../types/blog-response-type";

export const getBlogByIdController = async (req: RequestWithParams<{
    id: string
}>, res: ResponseType<BlogResponseType | number>) => {
    const id = req.params.id

    const targetBlog = await QueryBlogRepository.getEntityById(id)
    if (!targetBlog) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(targetBlog)
}

