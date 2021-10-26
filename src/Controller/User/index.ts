import { Request, Response, NextFunction } from "express";
import Responses from "../../Utils/Helper/Response";
import UserService from "../../Service/User";
import { PayloadUserVO } from "../../Types";

class User {
    userService: UserService;

    constructor() {
        this.userService = new UserService()
    }

    public async userLogin(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            try {
                if (!req.body?.username) throw "Username Required";
                else if (!req.body?.password) throw "Password Required";
            } catch (error) {
                return Responses.badRequest(res, error, next);
            };
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                username: req.body?.username,
                password: req.body?.password,
            } as PayloadUserVO

            const Result = await this.userService.userLogin(payload);
            return Responses.success(res, Result)
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    }
};

export default User;