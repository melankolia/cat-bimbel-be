import NilaiModel from "../../Model/Nilai";
import UserModel from "../../Model/User";
import { PayloadCreateNilaiVO } from "../../Types";
import { NilaiService } from "./index.d";
import { v4 as uuidv4 } from "uuid";

class Nilai implements NilaiService {
    nilaiModel: NilaiModel;
    userModel: UserModel;

    constructor() {
        this.nilaiModel = new NilaiModel();
        this.userModel = new UserModel();
    }

    public async findAll(secureId: string, type: string): Promise<any> {
        try {
            const Result = await this.nilaiModel.findAll(secureId, type);

            return Result;
        } catch (error) {
            throw error;
        }
    }

    public async insertData(payload: PayloadCreateNilaiVO): Promise<any> {
        try {
            const [User] = await this.userModel.findBySecureId(payload.userSecureId)
            if (!User) throw "Sorry, User Not Found";

            payload.id_user = User.id;
            payload.secureId = uuidv4();
            const Result = this.nilaiModel.insertData(payload);

            return true;
        } catch (error) {
            throw error;
        }
    }

    public async findAllKecermatan(secureId: string): Promise<any> {
        try {
            let Result: Array<{
                secureId: string;
                paket_soal: string;
                grandTotal: number;
                section: Array<{
                    title: string;
                    benar: number;
                    salah: number;
                }>;
            }> = [];
            const Kecermatan = await this.nilaiModel.findAllKecermatan(secureId);

            if (Kecermatan.length > 0) {
                Kecermatan.map((e: any) => {
                    e.benar = e?.benar.length != 0 ? e.benar?.split(",") : 0;
                    e.salah = e?.salah.length != 0 ? e.salah?.split(",") : 0;
                    Result.push({
                        secureId: e.secureId,
                        paket_soal: e.paket_soal,
                        grandTotal: e.benar?.reduce((e: any, c: any) => +e + +c) / e.benar.length,
                        section: e?.section?.split(",")?.map((e2: any, i: any) => ({
                            title: e2,
                            benar: e.benar[i] ? +e.benar[i] : 0,
                            salah: e.salah[i] ? +e.salah[i] : 0,
                        }))
                    })
                })
            } else return Kecermatan

            return Result;
        } catch (error) {
            throw error;
        }
    }
};

export default Nilai;