import { PayloadUserVO } from "../../Types";

export interface UserModel {
    userLogin(PayloadUser: PayloadUserVO): Promise<any>;
}

