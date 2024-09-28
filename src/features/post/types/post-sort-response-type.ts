import {PostResponseType} from "./post-response-type";

export type PostSortResponseType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostResponseType[]
}