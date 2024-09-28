import {HTTP_STATUS, RequestWithBody, ResponseType} from "../../../models/common";
import {QueryPostRepository} from "../repostitories/query-post-repository";
import {CreatePostModel} from "../types/create-post-model";
import {PostResponseType} from "../types/post-response-type";
import {PostsService} from "../services/post-service";

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