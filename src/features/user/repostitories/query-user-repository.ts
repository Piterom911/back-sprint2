import {userCollection} from "../../../db/db";
import {QueryUserModel} from "../types/query-user-model";
import {UserSortResponseType} from "../types/user-sort-response-type";
import {AuthMeViewModel, UserResponseType} from "../types/user-response-type";
import {ObjectId} from "mongodb";
import {UserDBType} from "../../../db/db-models";
import {FilterType} from "../types/find-user-by-query-filter-type";
import {userMapper} from "../mappers/user-response-mapper";

export class QueryUserRepository {
    static async getAllEntities(sortData: QueryUserModel): Promise<UserSortResponseType> {
        const searchLoginTerm = sortData.searchLoginTerm || null
        const searchEmailTerm = sortData.searchEmailTerm || null
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        let filter = this.filter_Find_EmailORLoginTerm(searchEmailTerm, searchLoginTerm)

        const totalCount = await userCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount / +pageSize)

        const users = await userCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items: users.map(userMapper)
        }
    }

    static async findUserByToken(id: string): Promise<AuthMeViewModel | null> {
        const user = await userCollection.findOne({_id: new ObjectId(id)})
        if (user === null) return null;

        return {
            email: user.email,
            login: user.login,
            userId: user._id
        };
    }

    static async findByLoginOrEmail(loginOrEmail: string): Promise<UserDBType | null> {
        return await userCollection.findOne({
            $or: [
                {email: {$regex: loginOrEmail, $options: 'i'}},
                {login: {$regex: loginOrEmail, $options: 'i'}}
            ]
        })
    }

    static async getEntityById(id: string): Promise<UserResponseType | null> {
        const targetUser = await userCollection.findOne({_id: new ObjectId(id)})
        if (!targetUser) return null
        return userMapper(targetUser)
    }

    static filter_Find_EmailORLoginTerm(email: string | null, login: string | null): FilterType {

        let filter: FilterType = {$or: []};
        if (email) {
            filter['$or']?.push({email: {$regex: email, $options: 'i'}});
        }
        if (login) {
            filter['$or']?.push({login: {$regex: login, $options: 'i'}});
        }
        if (filter['$or']?.length === 0) {
            filter['$or']?.push({});
        }
        return filter;
    }
}