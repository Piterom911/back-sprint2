import {RequestWithQuery, ResponseType} from "../../../types/request-types";
import {QueryUserModel} from "../types/query-user-model";
import {UserSortResponseType} from "../types/user-sort-response-type";
import {QueryUserRepository} from "../repostitories/query-user-repository";

export const getAllUsersController = async (req: RequestWithQuery<QueryUserModel>, res: ResponseType<UserSortResponseType>): Promise<void> => {
    const sortData = {
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const users: UserSortResponseType = await QueryUserRepository.getAllEntities(sortData)
    res.send(users)
}