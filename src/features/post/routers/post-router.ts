import {Router} from "express";
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {postValidation} from "../../../validators/post-validator";
import {mongoIdParamValidation} from "../../../middlewares/mongo-id-param-validator";
import {getPostsController} from "../controllers/get-posts-controller";
import {getPostByIdController} from "../controllers/get-post-by-id-controller";
import {createPostController} from "../controllers/create-post-controller";
import {updatePostController} from "../controllers/update-post-controller";
import {deletePostController} from "../controllers/delete-post-controller";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";
import {getAllCommentsByPostIdController} from "../controllers/get-all-comments-by-post-id-controller";
import {createCommentByPostIdController} from "../controllers/create-comment-by-post-id-controller";
import {commentValidation} from "../../comment/validators/comment-validator";

export const postRouter = Router({})

// post routers
postRouter.get('/', getPostsController)
postRouter.get('/:id', mongoIdParamValidation(), getPostByIdController)
postRouter.post('/', authMiddleware, postValidation(), createPostController)
postRouter.put('/:id', mongoIdParamValidation(), authMiddleware, postValidation(), updatePostController)
postRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, deletePostController)

// comment by post id routers
postRouter.get('/:id/comments', mongoIdParamValidation(), getAllCommentsByPostIdController)
postRouter.post('/:id/comments', authJwtMiddleware, mongoIdParamValidation(), commentValidation(), createCommentByPostIdController)















