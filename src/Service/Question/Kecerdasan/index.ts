import KecerdasanModel from "../../../Model/Question/Kecerdasan";
import KecerdasanGroupModel from "../../../Model/Group/Kecerdasan";
import { PayloadCreateKecerdasanAnswerVO, PayloadCreateKecerdasanQuestionVO, PayloadRequestKecerdasanQuestionVO } from "../../../Types";
import { KecerdasanService } from "./index.d";
import { v4 as uuidv4 } from "uuid";

class Kecerdasan implements KecerdasanService {
    kecerdasanModel: KecerdasanModel;
    kecerdasanGroupModel: KecerdasanGroupModel;

    constructor() {
        this.kecerdasanModel = new KecerdasanModel();
        this.kecerdasanGroupModel = new KecerdasanGroupModel();
    }

    public async findAll(secureId: string): Promise<any> {
        try {
            const [KecerdasanDetail] = await this.kecerdasanGroupModel.findOne(secureId);
            if (!KecerdasanDetail) throw "Group Not Found";

            const Kecerdasan = await this.kecerdasanModel.findAll(secureId);
            console.log(Kecerdasan);
            if (!Kecerdasan) throw "Get Data Error";
            if (Kecerdasan.length != 0) {
                let Result = [] as Array<{
                    secureId: string;
                    sessionTime: string;
                    question: {
                        secureId: string;
                        question: string;
                    };
                    answer: {
                        answer: null;
                        symbol: null;
                        value: null;
                    };
                    modeAdd: boolean;
                    loadingDelete: boolean;
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
                            answer: {
                                answer: null,
                                symbol: null,
                                value: null,
                            },
                            modeAdd: false,
                            loadingDelete: false,
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

                const ResultVO = {
                    secureId: KecerdasanDetail.secureId,
                    title: KecerdasanDetail.title,
                    description: KecerdasanDetail.description,
                    time: KecerdasanDetail.time,
                    is_active: KecerdasanDetail.is_active,
                    result: [...Result]
                }

                return ResultVO;
            } else {

                const ResultVO = {
                    secureId: KecerdasanDetail.secureId,
                    title: KecerdasanDetail.title,
                    description: KecerdasanDetail.description,
                    time: KecerdasanDetail.time,
                    is_active: KecerdasanDetail.is_active,
                    result: [...Kecerdasan]
                }

                return ResultVO;
            }
        } catch (error) {
            throw error;
        }
    }

    public async insertData(payload: PayloadRequestKecerdasanQuestionVO): Promise<any> {
        try {
            const [Group] = await this.kecerdasanGroupModel.findOne(payload.groupSecureId);
            console.log(Group);
            if (!Group) throw "Group Not Found";

            let Question: any;
            let FindQuestion: any;
            let isUpdate: boolean;
            let payload_insert = {} as PayloadCreateKecerdasanQuestionVO;

            // If there is no secureId than create it
            if (!payload.question.secureId) {
                isUpdate = false;
                payload_insert = {
                    id_group: Group.id,
                    secureId: uuidv4(),
                    question: payload.question.question,
                };

                Question = await this.kecerdasanModel.createQuestion(payload_insert);
                if (!Question) throw "Create Question Error";

            } else {
                isUpdate = true;
                [FindQuestion] = await this.kecerdasanModel.findOne(payload.question.secureId);
                if (!FindQuestion) throw "Question Not Found";

                payload_insert = {
                    id_group: Group.id,
                    secureId: payload.question.secureId,
                    question: payload.question.question,
                }

                Question = await this.kecerdasanModel.updateQuestion(payload_insert);
                if (!Question) throw "Update Question Error";

            }


            // There is no update scenario, i use delete than create scenario to make sure data is clean
            // Delete Answer When they already created, i check it using secureId
            // Then re-create it 
            if (payload.answerList.every(e => e.secureId)) {
                const FindAnswer = await this.kecerdasanModel.findAllAnswer(payload_insert.secureId);
                if (FindAnswer.length != 0) {
                    const Delete = await this.kecerdasanModel.deleteAnswer(FindAnswer);
                    if (!Delete) throw "Delete Answer Error";
                }
            }

            const PayloadAnswer: Array<PayloadCreateKecerdasanAnswerVO> = [];
            payload.answerList.map(e => {
                PayloadAnswer.push({
                    id_question: isUpdate ? FindQuestion.id : Question.insertId,
                    secureId: uuidv4(),
                    answer: e.answer,
                    value: e.value,
                    symbol: e.symbol,
                })
            });

            const Answer = await this.kecerdasanModel.createAnswer(PayloadAnswer)
            if (!Answer) throw "Create Answer Error";

            const Result: any = {
                ...payload,
                modeAdd: false,
                loadingDelete: false,
                question: { question: payload_insert.question, secureId: payload_insert.secureId },
                answerList: [...PayloadAnswer.map(e => {
                    return {
                        secureId: e.secureId,
                        answer: e.answer,
                        value: e.value,
                        symbol: e.symbol,
                    }
                })]
            };

            return Result;
        } catch (error) {
            throw error;
        }
    }

    public async deleteQuestion(secureId: string): Promise<any> {
        try {
            const Question = await this.kecerdasanModel.deleteQuestion(secureId);
            if (!Question) throw "Delete Data Error";

            return true;
        } catch (error) {
            throw error;
        }
    }

}

export default Kecerdasan;