import {Response, Router} from "express";
import {HTTP_STATUS, RequestWithBody, RequestWithParams, RequestWithQuery, ResponseType} from "../models/common";
import {CreateUserModel} from "../models/user/input/create-user-input-model";
import {UserOutputModel} from "../models/user/output/user-output-model";
import {UserService} from "../services/user-service";
import {QueryUserInputModel} from "../models/user/input/query-user-input-model";
import {SortUserOutputModel} from "../models/user/output/sort-user-output-model";
import {QueryUserRepository} from "../repostitories/query-repositories/user-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {userValidation} from "../validators/user-validator";
import {mongoIdParamValidation} from "../validators/id-param-validator";

export const userRouter = Router({})

userRouter.get('/', authMiddleware, async (req: RequestWithQuery<QueryUserInputModel>, res: ResponseType<SortUserOutputModel>): Promise<void> => {
    const sortData = {
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const users: SortUserOutputModel = await QueryUserRepository.getAllEntities(sortData)
    res.send(users)
})

userRouter.post('/', authMiddleware, userValidation(),
    async (req: RequestWithBody<CreateUserModel>, res: ResponseType<UserOutputModel>): Promise<void> => {
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
