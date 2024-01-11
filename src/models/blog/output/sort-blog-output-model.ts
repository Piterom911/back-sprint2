import {BlogOutputModel} from "./blog-output-model";

export type SortBlogOutputModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: BlogOutputModel[]
}