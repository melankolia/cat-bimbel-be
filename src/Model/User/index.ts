import Database from "../../Utils/Configs/db";
import { PayloadUserVO } from "../../Types";
import { UserModel } from "./index.d";

class User implements UserModel {
    public userLogin(PayloadUser: PayloadUserVO): Promise<any> {
        const sql = `SELECT * FROM User`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default User;