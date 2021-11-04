import Database from "../../../Utils/Configs/db";
import { KecermatanModel } from "./index.d";
import { PayloadActivationVO, PayloadCreateKecermatanVO } from "../../../Types";

class Kecermatan implements KecermatanModel {
    public createData(payload: PayloadCreateKecermatanVO): Promise<any> {
        const sql = `INSERT INTO kecermatan_group SET ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public updateData(payload: PayloadCreateKecermatanVO): Promise<any> {
        const sql = `update kecermatan_group set
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
        const sql = `update kecermatan_group set
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
        const sql = `delete from kecermatan_group
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
                            kecermatan_group
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
                        FROM kecermatan_group`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default Kecermatan;