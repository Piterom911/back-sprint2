import {Router} from "express";
import {getCommentByIdController} from "../controllers/get-comment-by-id-controller";
import {updateCommentByIdController} from "../controllers/update-comment-by-id-controller";
import {authJwtMiddleware} from "../../../middlewares/auth/auth-jwt-middleware";
import {deleteCommentByIdController} from "../controllers/delete-comment-by-id-controller";
import {checkCommentOwnership} from "../middlewares/checkCommentOwnership";
import {mongoIdParamValidation} from "../../../middlewares/mongo-id-param-validator";
import {commentValidation} from "../validators/comment-validator";

export const commentRouter = Router({})

commentRouter.get("/:id", mongoIdParamValidation(), getCommentByIdController)
commentRouter.put("/:id", mongoIdParamValidation(), commentValidation(), authJwtMiddleware, checkCommentOwnership, updateCommentByIdController)
commentRouter.delete("/:id", mongoIdParamValidation(), authJwtMiddleware, checkCommentOwnership, deleteCommentByIdController)