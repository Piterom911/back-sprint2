import {Router, Request, Response} from "express"
import {db} from "../db/db";
import {URI_PATHS} from "../models/common";

export const testsRouter = Router({})

testsRouter.delete('/', (req: Request, res: Response) => {
    db.videos = []
    db.posts = []
    db.blogs = []
    res.sendStatus(204)
})













