import { PayloadCreateKecermatanSectionVO } from "../../../Types"
export interface KecermatanModel {
    findAll(secureId: string): Promise<any>
    findOne(secureId: string): Promise<any>
    createSection(payload: PayloadCreateKecermatanSectionVO): Promise<any>
    deleteSection(secureId: string): Promise<any>
    deleteQuestion(secureId: string): Promise<any>
};