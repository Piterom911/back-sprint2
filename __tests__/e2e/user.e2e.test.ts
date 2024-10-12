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

    it("doesn't create user with false authorisation data", async () => {
        const userBody: UserService = {
            login: 'Roman',
            password: 'qwerty',
            email: 'chumba@maol.com'
        }

        const createdUser = await userTestManager.createUser(userBody, HTTP_STATUS.UNAUTHORIZED, authFalse)
        expect(createdUser.body).toEqual({})
    })

    it("doesn't create user with false user data", async () => {
        const userBody: UserService = {
            login: 'HTis',
            password: 'somePassword',
            email: 'someFalseEmail'
        }

        const createdUser = await userTestManager.createUser(userBody, HTTP_STATUS.BAD_REQUEST, authRight)
        expect(createdUser.body).toEqual({
            "errorsMessages": [
                {
                    "message": expect.any(String),
                    "field": expect.any(String)
                }
            ]
        })
    })

    it('create user authorization: check response, check creation in DB', async () => {
        const userBody: UserService = {
            login: 'Roman',
            password: 'qwerty',
            email: 'roman@gamil.com'
        }

        const createdUser = await userTestManager.createUser(userBody, HTTP_STATUS.CREATED, authRight)

        expect(createdUser.body).toEqual({
            login: 'Roman',
            email: 'roman@gamil.com',
            id: expect.any(String),
            createdAt: expect.any(String),
        })

        const allUsers = await userTestManager.getUsers(HTTP_STATUS.OK, authRight)

        expect(allUsers.body).toEqual({
            ...startEmptyArr,
            totalCount: 1,
            pagesCount: 1,
            items: [
                {
                    id: createdUser.body.id,
                    login: 'Roman',
                    email: 'roman@gamil.com',
                    createdAt: expect.any(String)
                }]
        })
    })

    it ("doesn't create already existing user",  async () => {
        const userData1: UserService = {
            login: 'Roman',
            password: 'qwerty',
            email: 'roman@gamil.com2'
        }

        const userData2:UserService = {
            login: 'Roman2',
            password: 'qwerty',
            email: 'roman@gamil.com'
        }

        const newUser = await userTestManager.createUser(userData1, HTTP_STATUS.BAD_REQUEST, authRight)
        expect(newUser.body).toEqual({
            errorsMessages: [{field: expect.any(String), message: expect.any(String)}]
        })

        const newUser2 = await userTestManager.createUser(userData2, HTTP_STATUS.BAD_REQUEST, authRight)
        expect(newUser2.body).toEqual({
            errorsMessages: [{field: expect.any(String), message: expect.any(String)}]
        })
    })

    it ("delete existing user by id", async () => {
        const allUsers = await userTestManager.getUsers(HTTP_STATUS.OK, authRight)
        const userId = allUsers.body.items[0].id

        await userTestManager.deleteUser(HTTP_STATUS.NO_CONTENT, userId, authRight)
    })

    it ("does not delete user with incorrect auth data", async () => {
        await userTestManager.getUsers(HTTP_STATUS.UNAUTHORIZED, authFalse)
    })

    it ("does not delete user by not existing id", async () => {
         await userTestManager.deleteUser(HTTP_STATUS.NOT_FOUND, "670a813f52699abb82e21757", authRight)
    })

})