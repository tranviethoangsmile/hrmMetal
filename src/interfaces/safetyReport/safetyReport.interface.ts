export interface ICreateSafetyReport {
    user_id: string;
    title: string;
    content: string;
    date: string;
    department_id: string;
}

export interface IUpdateSafetyReport {
    id: string;
    user_id: string;
    title?: string;
    content?: string;
}

export interface IConfirmSafetyReport {
    id: string;
    leader_id: string;
}
