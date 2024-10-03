import {Response, Router} from "express";
import {RequestWithBody, RequestWithParams, RequestWithQuery, ResponseType} from "../../../types/request-types";
import {CreateUserModel} from "../types/create-user-model";
import {UserResponseType} from "../types/user-response-type";
import {UserService} from "../services/user-service";
import {QueryUserModel} from "../types/query-user-model";
import {UserSortResponseType} from "../types/user-sort-response-type";
import {QueryUserRepository} from "../repostitories/query-user-repository";
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {userValidation} from "../../../validators/user-validator";
import {mongoIdParamValidation} from "../../../middlewares/mongo-id-param-validator";
import {HTTP_STATUS} from "../../../constants/http-status";

export const userRouter = Router({})

userRouter.get('/', authMiddleware, async (req: RequestWithQuery<QueryUserModel>, res: ResponseType<UserSortResponseType>): Promise<void> => {
    const sortData = {
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const users: UserSortResponseType = await QueryUserRepository.getAllEntities(sortData)
    res.send(users)
})

userRouter.post('/', authMiddleware, userValidation(),
    async (req: RequestWithBody<CreateUserModel>, res: ResponseType<UserResponseType>): Promise<void> => {
        const createdUser = await UserService.createNewEntity(req.body)
        if (!createdUser) {
            res.sendStatus(HTTP_STATUS.BAD_REQUEST)
            return
        }

        const newUser = await QueryUserRepository.getEntityById(createdUser)
        if (!newUser) {
            res.sendStatus(HTTP_STATUS.BAD_REQUEST)
            return
        }
        res.status(HTTP_STATUS.CREATED).send(newUser)
    })

userRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id

    const isExistedUser = await QueryUserRepository.getEntityById(id)
    if (!isExistedUser) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const targetUser = await UserService.deleteEntity(id)
    if (!targetUser) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND);
        return
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT)
})
