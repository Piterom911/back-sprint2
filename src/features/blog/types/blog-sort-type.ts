import {BlogResponseType} from "./blog-response-type";

export type BlogSortType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: BlogResponseType[]
}