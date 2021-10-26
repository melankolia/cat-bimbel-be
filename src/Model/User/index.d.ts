import { PayloadUserVO } from "../../Types";

export interface UserModel {
    findByUsername(username: string): Promise<any>;
    createUser(PayloadUser: PayloadUser): Promise<any>;
}

