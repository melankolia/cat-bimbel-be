import { PayloadUserVO, PayloadListUserVO } from "../../Types";

export interface UserService {
    userLogin(PayloadUser: PayloadUserVO): Promise<any>
    findAll(Payload: PayloadListUserVO): Promise<any>
}