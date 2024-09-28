import {HTTP_STATUS, RequestWithBody, ResponseType} from "../../../models/common";
import {QueryBlogRepository} from "../../../repostitories/query-repositories/blog-repository";
import {CreateBlogModel} from "../types/create-blog-model";
import {BlogResponseType} from "../types/blog-response-type";
import {BlogsService} from "../services/blog-service";

export const createBlogController = async (req: RequestWithBody<CreateBlogModel>, res: ResponseType<BlogResponseType | null>) => {
    const createdBlogId = await BlogsService.postNewEntity(req.body)

    if (!createdBlogId) {
        res.sendStatus(HTTP_STATUS.SERVICE_UNAVAILABLE)
        return
    }

    const createdBlog = await QueryBlogRepository.getEntityById(createdBlogId)
    res.status(HTTP_STATUS.CREATED).send(createdBlog)
}

