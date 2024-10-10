import {MongoMemoryServer} from "mongodb-memory-server-global-4.4";
import {eraseDB, runDb} from "../../src/db/db";

export const createMongoMemoryServer = () => {
    let mongodb: MongoMemoryServer

    beforeAll(async() => {
        mongodb = await MongoMemoryServer.create()
        const uri = mongodb.getUri()
        await runDb(uri)

        await eraseDB();
        console.log('Drop successful')
    })

    afterAll(async () => {
        await mongodb.stop();
    })
}