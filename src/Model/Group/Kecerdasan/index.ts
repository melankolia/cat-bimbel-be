import Database from "../../../Utils/Configs/db";
import { KecerdasanModel } from "./index.d";
import { PayloadActivationVO, PayloadCreateKecerdasanVO } from "../../../Types";

class Kecerdasan implements KecerdasanModel {
    public createData(payload: PayloadCreateKecerdasanVO): Promise<any> {
        const sql = `INSERT INTO kecerdasan_group SET ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public updateData(payload: PayloadCreateKecerdasanVO): Promise<any> {
        const sql = `update kecerdasan_group set
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
        const sql = `update kecerdasan_group set
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
        const sql = `delete from kecerdasan_group
                            where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public findOne(secureId: string): Promise<any> {
        const sql = `SELECT * FROM 
                            kecerdasan_group
                            where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public findAll(): Promise<any> {
        const sql = `SELECT 
                        secureId,
                        title,
                        description,
                        time,
                        is_active
                        FROM kecerdasan_group`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default Kecerdasan;