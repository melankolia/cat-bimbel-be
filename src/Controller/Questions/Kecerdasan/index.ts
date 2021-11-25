import { Request, Response, NextFunction } from "express";
import Responses from "../../../Utils/Helper/Response";
import KecerdasanService from "../../../Service/Question/Kecerdasan";
import { PayloadRequestKecerdasanQuestionVO } from "../../../Types";
import { v4 as uuidv4 } from "uuid";

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

    public async insertData(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.body?.groupSecureId) throw "SecureId Group Required";
            else if (req.body?.answerList.length == 0) throw "Answer List Required at least 2 answer's"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const Payload = {
                groupSecureId: req.body.groupSecureId,
                question: {
                    question: req.body.question?.question,
                    secureId: req.body.question?.secureId || ""
                },
                answerList: [...req.body.answerList]
            } as PayloadRequestKecerdasanQuestionVO

            const Result = await this.kecerdasanService.insertData(Payload);
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