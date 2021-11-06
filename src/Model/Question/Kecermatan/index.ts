import Database from "../../../Utils/Configs/db";
import { KecermatanModel } from "./index.d";

class Kecermatan implements KecermatanModel {
    public findAll(secureId: string): Promise<any> {
        const sql = `select 	kg.secureId as group_secureId,
                                ks.secureId as section_secureId,
                                ks.title as title,
                                ks.table_name as table_name,
                                ks.first_row as first_row,
                                ks.second_row as second_row,
                                kq.secureId as question_secureId,
                                kq.question as question,
                                ka.secureId as answer_secureId,
                                ka.value as value,
                                ka.symbol as symbol
                        from kecermatan_question kq
                        left join kecermatan_section ks on kq.id_section = ks.id
                        left join kecermatan_answer ka on kq.id = ka.id_question
                        left join kecermatan_group kg on ks.id_group = kg.id
                        where kg.secureId = ?
                        order by kq.id, ks.id, ka.id ASC`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default Kecermatan;