
export interface KecerdasanService {
    findAll(secureId: string): Promise<any>
    deleteQuestion(secureId: string): Promise<any>
};