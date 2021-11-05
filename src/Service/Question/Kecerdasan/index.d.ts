import { PayloadRequestKecerdasanQuestionVO } from "../../../Types";
export interface KecerdasanService {
    findAll(secureId: string): Promise<any>
    insertData(payload: PayloadRequestKecerdasanQuestionVO): Promise<any>
    deleteQuestion(secureId: string): Promise<any>
};