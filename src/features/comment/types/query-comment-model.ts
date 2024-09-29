import {SortDirection} from "mongodb";

export type QueryCommentModel = {
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}