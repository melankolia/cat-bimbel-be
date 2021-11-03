import { PayloadCreateKecerdasanVO } from "../../../Types"

export interface KecerdasanService {
    createData(payload: PayloadCreateKecerdasanVO): Promise<any>
    updateData(payload: PayloadCreateKecerdasanVO): Promise<any>
    deleteData(secureId: string): Promise<any>
    activation(payload: PayloadActivationVO): Promise<any>
    findAll(): Promise<any>
}