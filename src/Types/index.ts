export interface PayloadUserVO {
    username: string;
    password: string;
}

export interface PayloadUserCreateVO {
    username: string;
    password: string;
    nama_lengkap: string;
    secureId: string;
    type: string;
}

export interface PayloadListUserVO {
    // limit: string;
    // page: string;
    search: string;
    // sortBy: string;
    // sortDesc: string;
}

export interface PayloadCreateKecerdasanVO {
    secureId: string;
    title: string;
    description: string;
    time: number;
    is_active: boolean;
}

export interface PayloadRequestKecerdasanQuestionVO {
    groupSecureId: string;
    secureId: string;
    question: string;
    answerList: Array<{
        secureId: string;
        answer: string;
        value: number;
        symbol: string;
    }>
}

export interface PayloadCreateKecerdasanAnswerVO {
    id_question: number;
    secureId: string;
    answer: string;
    value: number;
    symbol: string;
}

export interface PayloadCreateKecerdasanQuestionVO {
    id_group: string | null;
    secureId: string;
    question: string;
}

export interface PayloadCreateKepribadianVO {
    secureId: string;
    title: string;
    description: string;
    time: number;
    is_active: boolean;
    type: string;
}

export interface PayloadCreateKejiwaanVO {
    secureId: string;
    title: string;
    description: string;
    time: number;
    is_active: boolean;
}

export interface PayloadCreateKecermatanVO {
    secureId: string;
    title: string;
    description: string;
    time: number;
    is_active: boolean;
}

export interface PayloadActivationVO {
    secureId: string;
    is_active: boolean;
}