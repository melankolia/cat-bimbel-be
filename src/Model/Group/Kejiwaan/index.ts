import Database from "../../../Utils/Configs/db";
import { KejiwaanModel } from "./index.d";
import { PayloadActivationVO, PayloadCreateKejiwaanVO } from "../../../Types";

class Kejiwaan implements KejiwaanModel {
    public createData(payload: PayloadCreateKejiwaanVO): Promise<any> {
        const sql = `INSERT INTO kejiwaan_group SET ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public updateData(payload: PayloadCreateKejiwaanVO): Promise<any> {
        const sql = `update kejiwaan_group set
                            title = ?,
                            description = ?,
                            time = ?
                            where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.title, payload.description, payload.time, payload.secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public activation(payload: PayloadActivationVO): Promise<any> {
        const sql = `update kejiwaan_group set
                            is_active = ?
                            where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.is_active, payload.secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public deleteData(secureId: string): Promise<any> {
        const sql = `delete from kejiwaan_group
                            where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public findOne(secureId: string): Promise<any> {
        const sql = `SELECT 
                        kg.secureId,
                        title,
                        description,
                        time,
                        is_active,
                        count(id_group) as total_soal
                        FROM kejiwaan_group kg
                    left join kejiwaan_question kq on kg.id = kq.id_group
                    where kg.secureId = ?
                    group by kg.id;`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public findAll(): Promise<any> {
        const sql = `SELECT 
                        kg.secureId,
                        title,
                        description,
                        time,
                        is_active,
                        count(id_group) as total_soal
                        FROM kejiwaan_group kg
                    left join kejiwaan_question kq on kg.id = kq.id_group
                    group by kg.id;`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default Kejiwaan;