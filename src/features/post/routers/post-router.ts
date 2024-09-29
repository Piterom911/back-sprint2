import {Router} from "express";
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {postValidation} from "../../../validators/post-validator";
import {mongoIdParamValidation} from "../../blog/validators/id-param-validator";
import {getPostsController} from "../controllers/get-posts-controller";
import {getPostByIdController} from "../controllers/get-post-by-id-controller";
import {createPostController} from "../controllers/create-post-controller";
import {updatePostController} from "../controllers/update-post-controller";
import {deletePostController} from "../controllers/delete-post-controller";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";
import {createCommentController} from "../../comment/controllers/create-comment-controller";
import {getAllCommentsController} from "../../comment/controllers/get-all-comments-controller";

export const postRouter = Router({})

// post routers
postRouter.get('/', getPostsController)
postRouter.get('/:id', mongoIdParamValidation(), getPostByIdController)
postRouter.post('/', authMiddleware, postValidation(), createPostController)
postRouter.put('/:id', mongoIdParamValidation(), authMiddleware, postValidation(), updatePostController)
postRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, deletePostController)

// comment by post id routers
postRouter.get('/:postId/comments', getAllCommentsController)
postRouter.post('/:postId/comments', authJwtMiddleware, createCommentController)















