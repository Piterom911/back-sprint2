import {RequestWithBody, ResponseType} from "../../../types/request-types";
import {QueryPostRepository} from "../repositories/query-post-repository";
import {CreatePostModel} from "../types/create-post-model";
import {PostResponseType} from "../types/post-response-type";
import {PostsService} from "../services/post-service";
import {HTTP_STATUS} from "../../../constants/http-status";

export const createPostController = async (req: RequestWithBody<CreatePostModel>, res: ResponseType<PostResponseType>) => {
    const postId = await PostsService.postNewEntity(req.body)
    if (!postId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const createdPost = await QueryPostRepository.getEntityById(postId)
    if (!createdPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    res.status(HTTP_STATUS.CREATED).send(createdPost)
}