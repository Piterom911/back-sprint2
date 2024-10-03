import {Router} from "express";
import {getCommentByIdController} from "../controllers/get-comment-by-id-controller";
import {updateCommentByIdController} from "../controllers/update-comment-by-id-controller";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";
import {deleteCommentByIdController} from "../controllers/delete-comment-by-id-controller";
import {checkCommentOwnership} from "../middlewares/checkCommentOwnership";

export const commentRouter = Router({})

commentRouter.get("/:commentId", getCommentByIdController)
commentRouter.put("/:commentId", authJwtMiddleware, checkCommentOwnership, updateCommentByIdController)
debugger
commentRouter.delete("/:commentId", authJwtMiddleware, checkCommentOwnership, deleteCommentByIdController)