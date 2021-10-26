import Database from "../../Utils/Configs/db";
import { PayloadUserCreateVO } from "../../Types";
import { UserModel } from "./index.d";

class User implements UserModel {
    public findByUsername(username: string): Promise<any> {
        const sql = `SELECT secureId,
                            username,
                            nama_lengkap,
                            password
                            FROM 
                            User where username = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [username], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public createUser(PayloadUser: PayloadUserCreateVO): Promise<any> {
        const sql = `INSERT INTO User SET ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, PayloadUser, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default User;