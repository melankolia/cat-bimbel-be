import { PayloadCrreateNilaiVO } from "../../Types"

export interface NilaiModel {
    findAll(secureId: string, type: string): Promise<any>
    insertData(payload: PayloadCrreateNilaiVO): Promise<any>
}