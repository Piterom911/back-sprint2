import {Request, Response, Router} from "express"
import {blogCollection, postCollection} from "../db/db";
import {HTTP_STATUS} from "../models/common";

export const testsRouter = Router({})

testsRouter.delete('', async (req: Request, res: Response) => {
    // await database.dropDatabase()

    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})

    res.sendStatus(HTTP_STATUS.NO_CONTENT)
})













