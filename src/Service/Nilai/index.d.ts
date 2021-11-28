import { PayloadCreateNilaiVO } from "../../Types";
export interface NilaiService {
    findAll(secureId: string, type: string): Promise<any>
    insertData(Payload: PayloadCreateNilaiVO): Promise<any>
    findAllKecermatan(secureId: string): Promise<any>
}
