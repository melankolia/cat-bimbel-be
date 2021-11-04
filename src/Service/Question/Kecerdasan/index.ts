import KecerdasanModel from "../../../Model/Question/Kecerdasan";
import { KecerdasanService } from "./index.d";


class Kecerdasan implements KecerdasanService {
    kecerdasanModel: KecerdasanModel;

    constructor() {
        this.kecerdasanModel = new KecerdasanModel();
    }

    public async findAll(secureId: string): Promise<any> {
        try {
            const Kecerdasan = await this.kecerdasanModel.findAll(secureId);
            if (!Kecerdasan) throw "Get Data Error";
            if (Kecerdasan.length != 0) {
                let Result = [] as Array<{
                    secureId: string;
                    sessionTime: string;
                    question: {
                        secureId: string;
                        question: string;
                    };
                    answerList: Array<{
                        secureId: string;
                        answer: string;
                        value: number;
                        symbol: string;
                    }>
                }>;

                Kecerdasan.map((e: any, i: any) => {
                    if (i == 0 || e.question_secureId != Result[Result.length - 1]?.question?.secureId) {
                        let pointer = i == 0 ? 0 : Result.length;

                        Result[pointer] = {
                            secureId: e.group_secureId,
                            sessionTime: e.session_time,
                            question: {
                                secureId: e.question_secureId,
                                question: e.question
                            },
                            answerList: [
                                {
                                    secureId: e.answer_secureId,
                                    symbol: e.symbol,
                                    answer: e.answer,
                                    value: e.value
                                }
                            ]
                        }
                    }

                    else if (e.question_secureId == Result[Result.length - 1]?.question?.secureId) {
                        Result[Result.length - 1].answerList.push({
                            secureId: e.answer_secureId,
                            symbol: e.symbol,
                            answer: e.answer,
                            value: e.value
                        })
                    }
                })

                return Result;
            } else {
                return Kecerdasan;
            }
        } catch (error) {
            throw error;

        }
    }

}

export default Kecerdasan;