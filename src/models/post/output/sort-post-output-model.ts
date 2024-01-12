import {PostOutputModel} from "./post-output-model";

export type SortPostOutputModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostOutputModel[]
}