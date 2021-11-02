import Database from "../../Utils/Configs/db";
import { PayloadListUserVO, PayloadUserCreateVO } from "../../Types";
import { UserModel } from "./index.d";

class User implements UserModel {
    public findByUsername(username: string): Promise<any> {
        const sql = `SELECT secureId,
                            username,
                            nama_lengkap,
                            password,
                            type
                            FROM 
                            User where username = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [username], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public findBySecureId(secureId: string): Promise<any> {
        const sql = `SELECT secureId,
                            username,
                            nama_lengkap,
                            password,
                            type
                            FROM 
                            User where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public findAll(payload: PayloadListUserVO): Promise<any> {
        console.log(payload);
        const sql = `SELECT secureId,
                            username,
                            password,
                            nama_lengkap
                            FROM
                            User where username LIKE ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.search], (err: any, response: any) => {
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

    public updateUser(PayloadUser: PayloadUserCreateVO): Promise<any> {
        const sql = `update User set 
                            username = ?,
                            password = ?,
                            nama_lengkap = ?
                        where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [PayloadUser.username, PayloadUser.password, PayloadUser.nama_lengkap, PayloadUser.secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default User;