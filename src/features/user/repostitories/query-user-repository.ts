import {userCollection} from "../../../db/db";
import {QueryUserDTO} from "../types/query-user";
import {UserSortResponseDTO} from "../types/user-sort-response";
import {AuthMeDTO, UserResponseDTO} from "../types/user-response";
import {ObjectId} from "mongodb";
import {UserModel, UserModelWithId} from "../../../db/db-models";
import {QueryFilterDTO} from "../types/query-filter";
import {userMapper} from "../mappers/user-response-mapper";

export class QueryUserRepository {
    static async getAllEntities(sortData: QueryUserDTO): Promise<UserSortResponseDTO> {
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

    static async findUserByToken(id: string): Promise<AuthMeDTO | null> {
        const user = await userCollection.findOne({_id: new ObjectId(id)})
        if (user === null) return null;

        return {
            email: user.email,
            login: user.login,
            userId: user._id
        };
    }

    static async findByLogin(login: string): Promise<UserModelWithId | null> {
        return await userCollection.findOne({
            login: {$regex: login, $options: 'i'}
        })
    }

    static async findByEmail(email: string): Promise<UserModelWithId | null> {
        return await userCollection.findOne({
            email: {$regex: email, $options: 'i'}
        })
    }

    static async findByLoginOrEmail(login: string, email: string): Promise<UserModelWithId | null> {
        return await userCollection.findOne({
            $or: [
                {email: {$regex: email, $options: 'i'}},
                {login: {$regex: login, $options: 'i'}}
            ]
        })
    }

    static async getEntityById(id: string): Promise<UserResponseDTO | null> {
        const targetUser = await userCollection.findOne({_id: new ObjectId(id)})
        if (!targetUser) return null
        return userMapper(targetUser)
    }

    static filter_Find_EmailORLoginTerm(email: string | null, login: string | null): QueryFilterDTO {

        let filter: QueryFilterDTO = {$or: []};
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