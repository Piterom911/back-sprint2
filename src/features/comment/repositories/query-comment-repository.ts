import {QueryCommentByPostIdModel} from "../types/query-comment-model";
import {CommentSortResponseType} from "../types/comment-sort-response-type";
import {commentCollection} from "../../../db/db";
import {commentMapper} from "../mappers/comment-response-mapper";
import {ObjectId} from "mongodb";
import {CommentResponseType} from "../types/comment-response-type";

export class QueryCommentRepository {
    static async getAllEntities(sortData: QueryCommentByPostIdModel): Promise<CommentSortResponseType> {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        const totalCount = await commentCollection.countDocuments({})

        const pagesCount = Math.ceil(totalCount / +pageSize)

        const comments = await commentCollection
            .find({postId: sortData.postId})
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items: comments.map(commentMapper)
        }
    }

    static async getEntityById(id: string): Promise<CommentResponseType | null> {
        const targetComment = await commentCollection.findOne({_id: new ObjectId(id)})
        if (!targetComment) return null
        return commentMapper(targetComment)
    }
}