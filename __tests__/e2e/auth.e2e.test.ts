import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";
import {userCollection} from "../../src/db/db";
import {ObjectId} from "mongodb";
import {generateHash} from "../../src/utils/password-hash";
import {authTestManager} from "../utils/auth-test-manager";
import {HTTP_STATUS} from "../../src/constants/http-status";

describe("auth endpoints", () => {
    createMongoMemoryServer()

    let accessToken;

    const authorizationIncorrect = `Bearer ${accessToken}incorrect`
    const authorizationCorrect = `Bearer ${accessToken}`

    it("create one user", async () => {
        await userCollection.insertOne({
            _id: new ObjectId('65006408082dbe6d9f6206f1'),
            login: "Roman",
            email: "roman@gamil.com",
            password: await generateHash("qwerty"),
            createdAt: "2024-09-08T18:24:21.794Z"
        },)
    })

    it("does not log in with incorrect data", async () => {
        const loginData = {
            loginOrEmail: "Romandus",
            password: "qwerty"
        }

        await authTestManager.logIn(loginData, HTTP_STATUS.UNAUTHORIZED)
        await authTestManager.logIn({loginOrEmail: null}, HTTP_STATUS.BAD_REQUEST)
    })

    it("logs in: check body input, check credentials", async () => {
        const loginData = {
            loginOrEmail: "Roman",
            password: "qwerty"
        }

        const auth = await authTestManager.logIn(loginData, HTTP_STATUS.OK)
        accessToken = auth.body.accessToken
        expect(accessToken).toEqual(expect.any(String))
    })

    it ("does not pass with incorrect JWT", () => {
        authTestManager.authMe(HTTP_STATUS.UNAUTHORIZED, authorizationIncorrect)
    })

    it ("pass with incorrect JWT", () => {
        authTestManager.authMe(HTTP_STATUS.OK, authorizationCorrect)
    })
})