import Database from "../../Utils/Configs/db";
import { PayloadCreateNilaiVO } from "../../Types";
import { NilaiModel } from "./index.d";

class Nilai implements NilaiModel {
    public findAll(secureId: string, type: string): Promise<any> {
        const sql = `select secureId,
                            type_nilai,
                            paket_soal,
                            nilai,
                            createdDate
                        from daftar_nilai
                        where id_user = 
                            (select id 
                                from user 
                                where secureId = ?) 
                        AND type_nilai = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId, type], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

    public insertData(payload: PayloadCreateNilaiVO): Promise<any> {
        const sql = `insert into 
                            daftar_nilai (secureId, type_nilai, paket_soal, nilai, id_user, createdDate) 
                            values (?, ?, ?, ?, ?, now())`

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.secureId, payload.type_nilai, payload.paket_soal, payload.nilai, payload.id_user], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        })
    }
}

export default Nilai;