import {Router} from "express";
import {getCommentByIdController} from "../controllers/get-comment-by-id-controller";
import {updateCommentByIdController} from "../controllers/update-comment-by-id-controller";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";

export const commentRouter = Router({})

commentRouter.get("/", getCommentByIdController)
commentRouter.post("/", authJwtMiddleware, updateCommentByIdController)