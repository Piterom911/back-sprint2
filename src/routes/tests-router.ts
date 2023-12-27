import {Router, Request, Response} from "express"
import {blogCollection, database, db, postCollection, videoCollection} from "../db/db";
import {HTTP_REQUEST_STATUS, URI_PATHS} from "../models/common";

export const testsRouter = Router({})

testsRouter.delete('/', async (req: Request, res: Response) => {
    // await database.dropDatabase()

    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
    await videoCollection.deleteMany({})

    res.sendStatus(HTTP_REQUEST_STATUS.NO_CONTENT)
})













