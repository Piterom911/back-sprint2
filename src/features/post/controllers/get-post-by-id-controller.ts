import {RequestWithParams, ResponseType} from "../../../types/request-types";
import {QueryPostRepository} from "../repostitories/query-post-repository";
import {PostResponseType} from "../types/post-response-type";
import {HTTP_STATUS} from "../../../constants/http-status";

export const getPostByIdController = async (req: RequestWithParams<{
    id: string
}>, res: ResponseType<PostResponseType>) => {
    const id = req.params.id

    const isExistedPost = await QueryPostRepository.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await QueryPostRepository.getEntityById(id)
    if (!targetPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(targetPost)
}