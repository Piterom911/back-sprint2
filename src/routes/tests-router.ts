import {Request, Response, Router} from "express"
import {blogCollection, postCollection, videoCollection} from "../db/db";
import {HTTP_REQUEST_STATUS} from "../models/common";

export const testsRouter = Router({})

testsRouter.delete('', async (req: Request, res: Response) => {
    // await database.dropDatabase()

    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
    await videoCollection.deleteMany({})

    res.sendStatus(HTTP_REQUEST_STATUS.NO_CONTENT)
})













