import {SortDirection} from "mongodb";

export type QueryUserInputModel = {
    searchLoginTerm?: string
    searchEmailTerm?: string
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}