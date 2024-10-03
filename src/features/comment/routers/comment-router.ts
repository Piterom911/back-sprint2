import {Router} from "express";
import {getCommentByIdController} from "../controllers/get-comment-by-id-controller";
import {updateCommentByIdController} from "../controllers/update-comment-by-id-controller";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";
import {deleteCommentByIdController} from "../controllers/delete-comment-by-id-controller";

export const commentRouter = Router({})

commentRouter.get("/:commentId", getCommentByIdController)
commentRouter.post("/:commentId", authJwtMiddleware, updateCommentByIdController)
debugger
commentRouter.delete("/:commentId", authJwtMiddleware, deleteCommentByIdController)