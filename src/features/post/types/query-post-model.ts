import {SortDirection} from "mongodb";

export type QueryPostModel = {
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}