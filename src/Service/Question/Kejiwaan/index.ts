import KejiwaanModel from "../../../Model/Question/Kejiwaan";
import KejiwaanGroupModel from "../../../Model/Group/Kejiwaan";
import { PayloadCreateKejiwaanAnswerVO, PayloadCreateKejiwaanQuestionVO, PayloadRequestKejiwaanQuestionVO } from "../../../Types";
import { KejiwaanService } from "./index.d";
import { v4 as uuidv4 } from "uuid";

class Kejiwaan implements KejiwaanService {
    kejiwaanModel: KejiwaanModel;
    kejiwaanGroupModel: KejiwaanGroupModel;

    constructor() {
        this.kejiwaanModel = new KejiwaanModel();
        this.kejiwaanGroupModel = new KejiwaanGroupModel();
    }

    public async findAll(secureId: string): Promise<any> {
        try {
            const Kejiwaan = await this.kejiwaanModel.findAll(secureId);
            if (!Kejiwaan) throw "Get Data Error";
            if (Kejiwaan.length != 0) {
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

                Kejiwaan.map((e: any, i: any) => {
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
                return Kejiwaan;
            }
        } catch (error) {
            throw error;
        }
    }

    public async insertData(payload: PayloadRequestKejiwaanQuestionVO): Promise<any> {
        try {
            const [Group] = await this.kejiwaanGroupModel.findOne(payload.groupSecureId);
            if (!Group) throw "Group Not Found";

            let Question: any;
            let FindQuestion: any;
            let isUpdate: boolean;
            let payload_insert = {} as PayloadCreateKejiwaanQuestionVO;

            // If there is no secureId than create it
            if (!payload.secureId) {
                isUpdate = false;
                payload_insert = {
                    id_group: Group.id,
                    secureId: uuidv4(),
                    question: payload.question,
                };

                Question = await this.kejiwaanModel.createQuestion(payload_insert);
                if (!Question) throw "Create Question Error";

            } else {
                isUpdate = true;
                [FindQuestion] = await this.kejiwaanModel.findOne(payload.secureId);
                if (!FindQuestion) throw "Question Not Found";

                payload_insert = {
                    id_group: Group.id,
                    secureId: payload.secureId,
                    question: payload.question,
                }

                Question = await this.kejiwaanModel.updateQuestion(payload_insert);
                if (!Question) throw "Update Question Error";

            }


            // There is no update scenario, i use delete than create scenario to make sure data is clean
            // Delete Answer When they already created, i check it using secureId
            // Then re-create it 
            if (payload.answerList.every(e => e.secureId)) {
                const FindAnswer = await this.kejiwaanModel.findAllAnswer(payload_insert.secureId);
                if (FindAnswer.length != 0) {
                    const Delete = await this.kejiwaanModel.deleteAnswer(FindAnswer);
                    if (!Delete) throw "Delete Answer Error";
                }
            }

            const PayloadAnswer: Array<PayloadCreateKejiwaanAnswerVO> = [];
            payload.answerList.map(e => {
                PayloadAnswer.push({
                    id_question: isUpdate ? FindQuestion.id : Question.insertId,
                    secureId: uuidv4(),
                    answer: e.answer,
                    value: e.value,
                    symbol: e.symbol,
                })
            });

            const Answer = await this.kejiwaanModel.createAnswer(PayloadAnswer)
            if (!Answer) throw "Create Answer Error";

            return true
        } catch (error) {
            throw error;
        }
    }

    public async deleteQuestion(secureId: string): Promise<any> {
        try {
            const Question = await this.kejiwaanModel.deleteQuestion(secureId);
            if (!Question) throw "Delete Data Error";

            return true;
        } catch (error) {
            throw error;
        }
    }

}

export default Kejiwaan;