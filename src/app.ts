import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';
import {testsRouter} from "./routes/tests-router";
import {URI_PATHS} from "./models/common";

export const app = express()
morganBody(app)
app.use(bodyParser.json())

app.use(URI_PATHS.tests, testsRouter)
app.use(URI_PATHS.videos, videosRouter)
app.use(URI_PATHS.blogs, blogsRouter)
app.use(URI_PATHS.posts, postsRouter)
































