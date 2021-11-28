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

    public findAllKecermatan(secureId: string): Promise<any> {
        const sql = `select 	secureId,
                                GROUP_CONCAT(DISTINCT paket_soal) as paket_soal,
                                group_concat(section) as section,
                                group_concat(benar) as benar,
                                GROUP_CONCAT(salah) as salah
                        from daftar_nilai_kecermatan
                        where id_user = (select id from User where secureId = ?)
                        group by secureId;`

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
}

export default Nilai;