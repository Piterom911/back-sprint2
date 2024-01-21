import {userCollection} from "../../db/db";
import {QueryUserInputModel} from "../../models/user/input/query-user-input-model";
import {userMapper} from "../../models/mappers/mapper";
import {SortUserOutputModel} from "../../models/user/output/sort-user-output-model";
import {UserOutputModel} from "../../models/user/output/user-output-model";
import {ObjectId} from "mongodb";

export class QueryUserRepository {
    static async getAllEntities(sortData: QueryUserInputModel): Promise<SortUserOutputModel> {
        const loginOrEmail = sortData.searchLoginTerm ?? sortData.searchEmailTerm ??null
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        let filter = {}

        if (loginOrEmail) {
            filter = {
                $or: [
                    {login: {$regex: loginOrEmail, $options: 'i'}},
                    {email: {$regex: loginOrEmail, $options: 'i'}},
                ]
            }
        }

        const totalCount = await userCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount / +pageSize)

        const users =  await userCollection
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

    static async getEntityById(id: string): Promise<UserOutputModel | null> {
        const targetUser =  await userCollection.findOne({_id: new ObjectId(id)})
        if (!targetUser) return null
        return userMapper(targetUser)
    }
}