import SoalModel from "../../Model/Soal";
import { SoalService } from "./index.d";

class Soal implements SoalService {
    soalModel: SoalModel;

    constructor() {
        this.soalModel = new SoalModel();
    }

    public async findAll(type: string): Promise<any> {
        try {
            let Soal: Array<any>;

            switch (type) {
                case 'kecerdasan':
                    Soal = await this.soalModel.findAllKecerdasan() as Array<any>
                    break;
                case 'kepribadian':
                    Soal = await this.soalModel.findAllKepribadian() as Array<any>
                    break;
                case 'kejiwaan':
                    Soal = await this.soalModel.findAllKejiwaan() as Array<any>
                    break;
                case 'kecermatan':
                    Soal = await this.soalModel.findAllKecermatan() as Array<any>
                    break;
                default:
                    throw "Type Required"
            }

            return Soal

        } catch (error) {
            throw error
        }
    }
};

export default Soal;