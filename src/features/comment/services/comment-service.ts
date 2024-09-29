import {CreateCommentType} from "../types/create-comment-type";
import {CommentDBType} from "../../../db/db-models";
import {QueryPostRepository} from "../../post/repositories/query-post-repository";
import {QueryUserRepository} from "../../user/repostitories/query-user-repository";
import {CommandCommentRepository} from "../repositories/command-comment-repository";
import {ObjectId} from "mongodb";

export class CommentService {
    static async postNewEntity(newEntityData: CreateCommentType): Promise<string | null> {
        let {content, postId, userId} = newEntityData
        const targetPost = await QueryPostRepository.getEntityById(postId)
        const user = await QueryUserRepository.getEntityById(userId)
        const userLogin = user?.login || user?.email

        if (!targetPost || !userLogin) return null

        const newComment: CommentDBType = {
            postId: new ObjectId(postId),
            content,
            commentatorInfo: {
                userId: userId,
                userLogin: userLogin,
            },
            createdAt: new Date().toISOString()
        }

        const createdComment = await CommandCommentRepository.postNewEntity(newComment)
        return createdComment ? createdComment.insertedId.toString() : null
    }
}