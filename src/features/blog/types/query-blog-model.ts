import {SortDirection} from "mongodb";

export type QueryBlogModel = {
    searchNameTerm?: string
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}

export type QueryPostByBlogIdInputModel = {
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}