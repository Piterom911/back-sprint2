import {UserResponseType} from "./user-response-type";

export type UserSortResponseType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserResponseType[]
}