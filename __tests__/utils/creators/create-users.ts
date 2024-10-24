import {URI_PATHS} from "../../../src/constants/uri-paths";
import request from "supertest";
import {app} from "../../../src/app";
import {UserResponseDTO} from "../../../src/features/user/types/user-response";

export const createUsers = async (numberOfUsers: number, authorization: string, password: string) => {
    const users: UserResponseDTO[] = [];
    for (let i = 1; i <= numberOfUsers; i++) {
        const userResponse = await request(app)
            .post(URI_PATHS.users)
            .set("Authorization", authorization)
            .send({
                login: `Roman${i}`,
                email: `roman${i}@gmail.com`,
                password: password,
            });

        users.push(userResponse.body)
    }

    return users;
}