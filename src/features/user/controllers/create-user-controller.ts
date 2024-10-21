import {RequestWithBody, ResponseType} from "../../../types/request-types";
import {CreateUserDTO} from "../types/create-user";
import {UserResponseDTO} from "../types/user-response";
import {UserService} from "../services/user-service";
import {HTTP_STATUS} from "../../../constants/http-status";
import {QueryUserRepository} from "../repostitories/query-user-repository";

export const createUserController = async (req: RequestWithBody<CreateUserDTO>, res: ResponseType<UserResponseDTO>): Promise<void> => {
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
}