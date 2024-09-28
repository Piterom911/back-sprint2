import {userCollection} from "../../db/db";
import {QueryUserInputModel} from "../../models/user/input/query-user-input-model";
import {SortUserOutputModel} from "../../models/user/output/sort-user-output-model";
import {AuthMeViewModel, UserOutputModel} from "../../models/user/output/user-output-model";
import {ObjectId} from "mongodb";
import {UserDBType} from "../../db/db-models";
import {FilterType} from "../../models/user/find-user-by-query-filter-model";
import {userMapper} from "../../features/user/mappers/user-response-mapper";

export class QueryUserRepository {
    static async getAllEntities(sortData: QueryUserInputModel): Promise<SortUserOutputModel> {
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
        const user = await userCollection.findOne({id})
        if (user === null)
            return null;

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

    static async getEntityById(id: string): Promise<UserOutputModel | null> {
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