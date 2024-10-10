import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";
import {UserService} from "../../src/features/user/services/user-service";
import {HTTP_STATUS} from "../../src/constants/http-status";
import {userTestManager} from "../utils/user-test-manager";

describe('User endpoints', () => {
    createMongoMemoryServer();

    let startEmptyArr = {
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: []
    }

    const authRight = `Basic YWRtaW46cXdlcnR5`;
    const authFalse = `Basic YWRtaW46dlcnR5`;

    it('create user authorization: check response, check creation in DB', async () => {
        const userBody: UserService = {
            login: 'Badabam',
            password: 'qwerty',
            email: 'badabam@aol.com'
        }

        const createdUser = await userTestManager.createUser(userBody, HTTP_STATUS.CREATED, authRight)

        expect(createdUser.body).toEqual({
            login: 'Badabam',
            email: 'badabam@aol.com',
            id:expect.any(String),
            createdAt: expect.any(String),
        })

        const allUsers = await userTestManager.getUsers(HTTP_STATUS.OK, authRight)

        expect(allUsers.body).toEqual({
            ...startEmptyArr,
            totalCount: 1,
            items: [
                {
                    id: allUsers.body.id,
                    login: 'Badabam',
                    email: 'badabam@aol.com',
                    createdAt: expect.any(String)
                }]
        })
    })

})