import KecermatanModel from "../../../Model/Question/Kecermatan";
import { KecermatanService } from "./index.d";
import { PayloadCreateKecermatanSectionVO } from "../../../Types"
import { v4 as uuidv4 } from "uuid";
import { title } from "process";
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
            const [Group] = await this.kecermatanModel.findOne(payload.groupSecureId);
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