import {RequestWithParams, ResponseType} from "../../../types/request-types";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";
import {BlogResponseType} from "../types/blog-response-type";
import {HTTP_STATUS} from "../../../constants/http-status";

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

