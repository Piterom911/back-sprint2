import express from 'express'
import {blogRouter} from "./features/blog/routers/blog-router";
import {postRouter} from "./features/post/routers/post-router";
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';
import {testsRouter} from "./features/test/routes/tests-router";
import {userRouter} from "./features/user/routers/user-router";
import {authRouter} from "./features/auth/routers/auth-router";
import {URI_PATHS} from "./constants/uri-paths";
import {commentRouter} from "./features/comment/routers/comment-router";
import {emailRouter} from "./features/email/routers/email-router";

export const app = express()
morganBody(app)
app.use(bodyParser.json())

app.use(URI_PATHS.tests, testsRouter)
app.use(URI_PATHS.auth, authRouter)
app.use(URI_PATHS.blogs, blogRouter)
app.use(URI_PATHS.posts, postRouter)
app.use(URI_PATHS.users, userRouter)
app.use(URI_PATHS.comments, commentRouter)
app.use(URI_PATHS.email, emailRouter)
































