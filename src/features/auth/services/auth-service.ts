import {userCollection} from "../../../db/db";
import {jwtService} from "../../../adapters/jwtService";
import {comparePassword} from "../../../utils/passwordHash";

export const authService = {

    async login(loginOrEmail:string, password:string):Promise<boolean|string> {
        try {
            const filter = {
                $or: [{login:loginOrEmail}, {email:loginOrEmail}]
            }
            const user = await userCollection.findOne(filter)
            if(user === null)
                return false;

            const pswCheck = await comparePassword(password, user.password)
            if(!pswCheck) return false;

            return await jwtService.createToken(user._id.toString())
        }

        catch(error) {
            throw new Error(`Cannot execute login: ${(error as Error).message}`)
        }
    }
}