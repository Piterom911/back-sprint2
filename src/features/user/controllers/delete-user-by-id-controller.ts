import {RequestWithParams} from "../../../types/request-types";
import {Response} from "express";
import {QueryUserRepository} from "../repostitories/query-user-repository";
import {HTTP_STATUS} from "../../../constants/http-status";
import {UserService} from "../services/user-service";

export const deleteUserByIdController = async (req: RequestWithParams<{ id: string }>, res: Response) => {
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
}