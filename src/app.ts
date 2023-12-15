import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {db} from "./db/db";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {authMiddleware} from "./middlewares/auth/auth-middleware";
export const app = express()

app.use(express.json())
app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

app.delete('/testing/all-data', authMiddleware, (req: Request, res: Response) => {
    db.videos = []
    db.posts = []
    db.blogs = []
    res.sendStatus(204)
})































