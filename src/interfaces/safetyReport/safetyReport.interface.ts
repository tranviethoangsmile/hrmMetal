export interface ICreateSafetyReport {
    user_id: string;
    title: string;
    content: string;
    date: string;
    department_id: string;
    solution: string;
    media_path?: string;
}

export interface IUpdateSafetyReport {
    id: string;
    user_id?: string;
    title?: string;
    content?: string;
    solution?: string;
    corrective_action?: string;
    leader_id?: string;
}

export interface IConfirmSafetyReport {
    id: string;
    leader_id: string;
    corrective_action?: string;
}

export interface IGetByUserId {
    user_id: string;
    date: string;
}
