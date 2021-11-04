
export interface KecerdasanModel {
    findAll(secureId: string): Promise<any>
    deleteQuestion(secureId: string): Promise<any>
};