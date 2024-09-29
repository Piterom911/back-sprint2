import {Router} from "express";
import {getAllCommentsController} from "../controllers/get-all-comments-controller";
import {createCommentController} from "../controllers/create-comment-controller";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";

export const commentRouter = Router({})

commentRouter.get("/", getAllCommentsController)
commentRouter.post("/", authJwtMiddleware, createCommentController)