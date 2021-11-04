import { Request, Response, NextFunction } from "express";
import Responses from "../../../Utils/Helper/Response";
import KecerdasanService from "../../../Service/Question/Kecerdasan";

class Kecerdasan {
    kecerdasanService: KecerdasanService;

    constructor() {
        this.kecerdasanService = new KecerdasanService();
    }

    public async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.query?.secureId) throw "SecureId Group Required"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const secureId = req.query?.secureId as string;

            const Result = await this.kecerdasanService.findAll(secureId);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    }

    public async deleteQuestion(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.query?.secureId) throw "SecureId Question Required"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const secureId = req.query?.secureId as string;

            const Result = await this.kecerdasanService.deleteQuestion(secureId);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    }
};

export default Kecerdasan;