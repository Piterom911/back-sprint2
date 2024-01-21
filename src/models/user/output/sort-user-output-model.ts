import {UserOutputModel} from "./user-output-model";

export type SortUserOutputModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserOutputModel[]
}