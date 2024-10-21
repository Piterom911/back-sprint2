import {RequestWithQuery, ResponseType} from "../../../types/request-types";
import {QueryUserDTO} from "../types/query-user";
import {UserSortResponseDTO} from "../types/user-sort-response";
import {QueryUserRepository} from "../repostitories/query-user-repository";

export const getAllUsersController = async (req: RequestWithQuery<QueryUserDTO>, res: ResponseType<UserSortResponseDTO>): Promise<void> => {
    const sortData = {
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const users: UserSortResponseDTO = await QueryUserRepository.getAllEntities(sortData)
    res.send(users)
}