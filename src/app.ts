import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {db} from "./db/db";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {authMiddleware} from "./middlewares/auth/auth-middleware";
export const app = express()

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos.length = 0
    db.posts.length = 0
    db.blogs.length = 0
    res.sendStatus(204)
})

app.use(express.json())
app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
































