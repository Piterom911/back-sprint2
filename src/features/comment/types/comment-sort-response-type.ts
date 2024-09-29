import {CommentResponseType} from "./comment-response-type";

export type CommentSortResponseType = {
    "pagesCount": number
    "page": number
    "pageSize": number
    "totalCount": number
    "items": CommentResponseType[]
}