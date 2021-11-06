import KecermatanModel from "../../../Model/Question/Kecermatan";
import { KecermatanService } from "./index.d";

class Kecermatan implements KecermatanService {
    kecermatanModel: KecermatanModel;

    constructor() {
        this.kecermatanModel = new KecermatanModel();
    }

    public async findAll(secureId: string): Promise<any> {
        try {
            const Kecermatan = await this.kecermatanModel.findAll(secureId);
            if (!Kecermatan) throw "Get Data Error";

            if (Kecermatan.length != 0) {
                let Result = [] as Array<{
                    secureId: string;
                    title: string;
                    tableName: string;
                    firstRow: string;
                    secondRow: string;
                    question: Array<{
                        secureId: string;
                        title: string;
                        answerList: Array<{
                            secureId: string;
                            symbol: string;
                            value: number;
                        }>
                    }>
                }>

                Kecermatan.map((e: any, i: any) => {
                    const lastSectionIndex = Result.length - 1;
                    const lastQuestionIndex = Result[lastSectionIndex]?.question.length - 1
                    const pointer = i == 0 ? 0 : Result.length;
                    // console.log("---------------------------------------------------------");
                    // console.log(`Loopingan ${i}`);
                    // console.log(`Pointer ${pointer}`);
                    // console.log({ lastSectionIndex, lastQuestionIndex });
                    // console.log(Result[lastSectionIndex]);
                    // console.log(Result[lastSectionIndex]?.question[lastQuestionIndex]);
                    if (i == 0 || e.section_secureId != Result[lastSectionIndex]?.secureId) {
                        Result[pointer] = {
                            secureId: e.section_secureId,
                            title: e.title,
                            tableName: e.table_name,
                            firstRow: e.first_row,
                            secondRow: e.second_row,
                            question: [
                                {
                                    secureId: e.question_secureId,
                                    title: e.question,
                                    answerList: [
                                        {
                                            secureId: e.answer_secureId,
                                            symbol: e.symbol,
                                            value: e.value
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                    else if (e.section_secureId == Result[lastSectionIndex]?.secureId) {
                        if (e.question_secureId != Result[lastSectionIndex].question[lastQuestionIndex]?.secureId) {
                            Result[lastSectionIndex].question.push({
                                secureId: e.question_secureId,
                                title: e.question,
                                answerList: [
                                    {
                                        secureId: e.answer_secureId,
                                        symbol: e.symbol,
                                        value: e.value
                                    }
                                ]
                            })
                        }
                        else if (e.question_secureId == Result[lastSectionIndex].question[lastQuestionIndex]?.secureId) {
                            Result[lastSectionIndex].question[lastQuestionIndex].answerList.push({
                                secureId: e.answer_secureId,
                                symbol: e.symbol,
                                value: e.value
                            })
                        }
                    }
                })
                return Result;
            } else {
                return Kecermatan;
            }
        } catch (error) {
            throw error
        }
    }
};

export default Kecermatan;