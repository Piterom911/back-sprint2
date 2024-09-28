import {SortDirection} from "mongodb";

export type QueryUserModel = {
    searchLoginTerm?: string
    searchEmailTerm?: string
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}