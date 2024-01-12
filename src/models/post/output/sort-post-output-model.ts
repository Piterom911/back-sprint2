import {PostOutputModel} from "./post-output-model";

export type SortBlogOutputModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostOutputModel[]
}