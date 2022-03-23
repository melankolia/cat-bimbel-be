import { PayloadCreateNilaiVO, PayloadCreateNilaiKecermatanVO } from "../../Types"

export interface NilaiModel {
    findAll(secureId: string, type: string): Promise<any>
    insertData(payload: PayloadCreateNilaiVO): Promise<any>
    findAllKecermatan(secureId: string): Promise<any>
    findAllNewKecermatan(secureId: string): Promise<any>
    insertDataKecermatan(payload: Array<PayloadCreateNilaiKecermatanVO>): Promise<any>
    insertDataNewKecermatan(payload: Array<PayloadCreateNilaiKecermatanVO>): Promise<any>
}