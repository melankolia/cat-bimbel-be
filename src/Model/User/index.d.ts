import { PayloadUserVO, PayloadListUserVO } from "../../Types";

export interface UserModel {
    findByUsername(username: string): Promise<any>;
    findBySecureId(secureId: string): Promise<any>;
    findAll(payload: PayloadListUserVO): Promise<any>;
    createUser(PayloadUser: PayloadUser): Promise<any>;
    updateUser(PayloadUser: PayloadUser): Promise<any>;
}

