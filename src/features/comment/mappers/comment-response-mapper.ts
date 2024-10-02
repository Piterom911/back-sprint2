import {WithId} from "mongodb";
import {CommentDBType} from "../../../db/db-models";
import {CommentResponseType} from "../types/comment-response-type";

export const commentMapper = (commentDb: WithId<CommentDBType>): CommentResponseType => {
    return {
        id: commentDb._id.toString(),
        postId: commentDb.postId.toString(),
        content: commentDb.content,
        commentatorInfo: {
            userId: commentDb.commentatorInfo.userId,
            userLogin: commentDb.commentatorInfo.userLogin,
        },
        createdAt: commentDb.createdAt
    }
}