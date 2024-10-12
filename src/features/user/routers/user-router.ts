import {Router} from "express";
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {userValidation} from "../../../validators/user-validator";
import {mongoIdParamValidation} from "../../../middlewares/mongo-id-param-validator";
import {getAllUsersController} from "../controllers/get-all-users-controller";
import {createUserController} from "../controllers/create-user-controller";
import {deleteUserByIdController} from "../controllers/delete-user-by-id-controller";

export const userRouter = Router({})

userRouter.get('/', authMiddleware, getAllUsersController)
userRouter.post('/', authMiddleware, userValidation(), createUserController)
userRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, deleteUserByIdController)
