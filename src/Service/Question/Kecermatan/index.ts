import KecermatanModel from "../../../Model/Question/Kecermatan";
import { KecermatanService } from "./index.d";
import {
    PayloadCreateKecermatanQuestionVO,
    PayloadRequestKecermatanQuestionVO,
    PayloadCreateKecermatanSectionVO,
    PayloadCreateKecermatanAnswerVO
} from "../../../Types"
import { v4 as uuidv4 } from "uuid";
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

    public async insertSection(payload: PayloadCreateKecermatanSectionVO): Promise<any> {
        try {
            const [Group] = await this.kecermatanModel.findOneGroup(payload.groupSecureId);
            if (!Group) throw "Kecermatan Group Not Found";

            if (!payload.secureId) {
                const payload_create = {
                    id_group: Group.id,
                    secureId: uuidv4(),
                    title: payload.title,
                    table_name: payload.table_name,
                    first_row: payload.first_row,
                    second_row: payload.second_row,
                }
                const Create = await this.kecermatanModel.createSection(payload_create)
                if (!Create) throw "Create Section Error";

            } else {
                const payload_update = {
                    id_group: Group.id,
                    secureId: payload.secureId,
                    title: payload.title,
                    table_name: payload.table_name,
                    first_row: payload.first_row,
                    second_row: payload.second_row,
                }
                const Update = await this.kecermatanModel.updateSection(payload_update)
                if (!Update) throw "Update Section Error";

            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    public async insertQuestion(payload: PayloadRequestKecermatanQuestionVO): Promise<any> {
        try {
            const [Section] = await this.kecermatanModel.findOneSection(payload.sectionSecureId);
            if (!Section) throw "Kecermatan Section Not Found";

            let Question: any;
            let FindQuestion: any;
            let payload_insert = {} as PayloadCreateKecermatanQuestionVO;
            let isUpdate: boolean;

            if (!payload.secureId) {
                isUpdate = false;
                payload_insert = {
                    id_section: Section.id,
                    secureId: uuidv4(),
                    question: payload.question,
                }
                Question = await this.kecermatanModel.createQuestion(payload_insert);
                if (!Question) throw "Create Question Error";
            } else {
                isUpdate = true;
                [FindQuestion] = await this.kecermatanModel.findOneQuestion(payload.secureId);
                if (!FindQuestion) throw "Question Not Found";

                payload_insert = {
                    id_section: Section.id,
                    secureId: payload.secureId,
                    question: payload.question,
                };

                Question = await this.kecermatanModel.updateQuestion(payload_insert);
                if (!Question) throw "Update Question Error";
            }

            // There is no update scenario, i use delete than create scenario to make sure data is clean
            // Delete Answer When they already created, i check it using secureId
            // Then re-create it 
            if (payload.answerList.every(e => e.secureId)) {
                const FindAnswer = await this.kecermatanModel.findAllAnswer(payload_insert.secureId);
                if (FindAnswer.length != 0) {
                    const Delete = await this.kecermatanModel.deleteAnswer(FindAnswer);
                    if (!Delete) throw "Delete Answer Error";
                }
            }

            const PayloadAnswer: Array<PayloadCreateKecermatanAnswerVO> = [];
            payload.answerList.map(e => {
                PayloadAnswer.push({
                    id_question: isUpdate ? FindQuestion.id : Question.insertId,
                    secureId: uuidv4(),
                    value: e.value,
                    symbol: e.symbol,
                })
            });

            const Answer = await this.kecermatanModel.createAnswer(PayloadAnswer)
            if (!Answer) throw "Create Answer Error";

            return true;
        } catch (error) {
            throw error;
        }
    }

    public async deleteSection(secureId: string): Promise<any> {
        try {
            const Question = await this.kecermatanModel.deleteSection(secureId);
            if (!Question) throw "Delete Data Error";

            return true;
        } catch (error) {
            throw error;
        }
    }

    public async deleteQuestion(secureId: string): Promise<any> {
        try {
            const Question = await this.kecermatanModel.deleteQuestion(secureId);
            if (!Question) throw "Delete Data Error";

            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default Kecermatan;