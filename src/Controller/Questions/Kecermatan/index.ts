import { Request, Response, NextFunction } from "express";
import Responses from "../../../Utils/Helper/Response";
import KecermatanService from "../../../Service/Question/Kecermatan";

class Kecermatan {
    kecermatanService: KecermatanService

    constructor() {
        this.kecermatanService = new KecermatanService();
    }

    public async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.query?.secureId) throw "SecureId Group Required"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const secureId = req.query?.secureId as string;

            const Result = await this.kecermatanService.findAll(secureId);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    }
}

export default Kecermatan;