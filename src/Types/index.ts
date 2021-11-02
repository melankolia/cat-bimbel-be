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