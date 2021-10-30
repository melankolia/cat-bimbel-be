import { Request, Response, NextFunction } from "express";
import Responses from "../../Utils/Helper/Response";
import UserService from "../../Service/User";
import { PayloadUserVO, PayloadUserCreateVO } from "../../Types";
import { v4 as uuidv4 } from "uuid";

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

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.body?.username ||
                !req.body?.password ||
                !req.body?.nama_lengkap
            ) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload: PayloadUserCreateVO = {
                username: req.body?.username,
                password: req.body?.password,
                nama_lengkap: req.body?.nama_lengkap,
                secureId: uuidv4(),
            }
            const Result = await this.userService.createUser(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }

    }

    public async updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.body?.secureId ||
                !req.body?.username ||
                !req.body?.password ||
                !req.body?.nama_lengkap
            ) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload: PayloadUserCreateVO = {
                secureId: req.body?.secureId,
                username: req.body?.username,
                password: req.body?.password,
                nama_lengkap: req.body?.nama_lengkap,
            }
            const Result = await this.userService.updateUser(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }

    }
};

export default User;