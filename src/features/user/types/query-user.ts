import {SortDirection} from "mongodb";

export type QueryUserDTO = {
    searchLoginTerm?: string
    searchEmailTerm?: string
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}