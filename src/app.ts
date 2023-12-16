import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {db} from "./db/db";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';

export const app = express()
morganBody(app)
app.use(bodyParser.json())

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos.length = 0
    db.posts.length = 0
    db.blogs.length = 0
    res.sendStatus(204)
})

app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
































