import { PayloadUserVO } from "../../Types";

export interface UserService {
    userLogin(PayloadUser: PayloadUserVO): Promise<any>
}