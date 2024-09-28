import {HTTP_STATUS, RequestWithParams, ResponseType} from "../../../models/common";
import {QueryPostRepository} from "../repostitories/query-post-repository";
import {PostResponseType} from "../types/post-response-type";

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