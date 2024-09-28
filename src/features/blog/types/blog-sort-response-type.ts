import {BlogResponseType} from "./blog-response-type";

export type BlogSortResponseType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: BlogResponseType[]
}