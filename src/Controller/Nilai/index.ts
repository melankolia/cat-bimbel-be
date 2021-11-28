import { Request, Response, NextFunction } from "express";
import Responses from "../../Utils/Helper/Response";
import NilaiService from "../../Service/Nilai";

class Nilai {
    nilaiService: NilaiService;

    constructor() {
        this.nilaiService = new NilaiService();
    }

    public async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.query?.secureId) throw "SecureId Required";
            else if (!req.query?.type) throw "Type Required";
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const secureId = req.query?.secureId as string;
            const type = req.query?.type as string;

            const Result = await this.nilaiService.findAll(secureId, type);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    }

    public async insertData(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.body?.userSecureId) throw "SecureId Required";
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const Payload = {
                secureId: "",
                userSecureId: req.body?.userSecureId,
                type_nilai: req.body?.type_nilai,
                paket_soal: req.body?.paket_soal,
                nilai: req.body?.nilai,
                id_user: req.body?.id_user
            };

            const Result = await this.nilaiService.insertData(Payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    }

    public async findAllKecermatan(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.query?.secureId) throw "SecureId Required";
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const secureId = req.query?.secureId as string;

            const Result = await this.nilaiService.findAllKecermatan(secureId);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    }
}

export default Nilai;