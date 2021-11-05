import { PayloadRequestKepribadianQuestionVO } from "../../../Types";
export interface KepribadianService {
    findAll(secureId: string): Promise<any>
    insertData(payload: PayloadRequestKepribadianQuestionVO): Promise<any>
    deleteQuestion(secureId: string): Promise<any>
};