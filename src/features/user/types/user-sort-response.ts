import {UserResponseDTO} from "./user-response";

export type UserSortResponseDTO = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserResponseDTO[]
}