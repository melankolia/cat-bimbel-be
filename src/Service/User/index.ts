import UserModel from "../../Model/User";
import { PayloadUserVO } from "../../Types";
import { UserService } from "./index.d";

class User implements UserService {
    userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public async userLogin(PayloadUser: PayloadUserVO): Promise<any> {
        try {
            const [User] = await this.userModel.userLogin(PayloadUser);
            if (!User) throw "Data Not Found";

            return User;
        } catch (error) {
            throw error;
        }
    }
}

export default User;