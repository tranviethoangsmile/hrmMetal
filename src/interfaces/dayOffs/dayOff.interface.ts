export interface create_day_off {
    date: string;
    user_id: string;
}

export interface update_day_off {
    id: string;
    date?: string;
    user_id?: string;
}
