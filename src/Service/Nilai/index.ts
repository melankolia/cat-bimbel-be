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
};

export default Nilai;