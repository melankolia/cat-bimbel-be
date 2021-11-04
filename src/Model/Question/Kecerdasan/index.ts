import Database from "../../../Utils/Configs/db";
import { KecerdasanModel } from "./index.d";

class Kecerdasan implements KecerdasanModel {
    public findAll(secureId: string): Promise<any> {
        const sql = `select 	kg.secureId as group_secureId,
                                kg.time as session_time,
                                kq.secureId as question_secureId,
                                kq.id as kq_id,
                                kq.question,
                                ka.secureId as answer_secureId,
                                ka.symbol,
                                ka.answer,
                                ka.value
                        from kecerdasan_question kq
                        left join kecerdasan_group kg on kq.id_group = kg.id
                        left join kecerdasan_answer ka on kq.id = ka.id_question
                        where kg.secureId = ?
                        order by kq.id, ka.id ASC;`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    };

    public deleteQuestion(secureId: string): Promise<any> {
        const sql = `delete from kecerdasan_question where secureId = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [secureId], (err: any, response: any) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }

};

export default Kecerdasan;