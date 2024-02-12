interface search_order {
    id?: string;
    date?: string;
    user_id?: string;
    position?: string;
    created_at?: Date;
    updated_at?: Date;
}
interface checkin_picked_order {
    id?: string;
    date: string;
    user_id: string;
    position?: string;
    created_at?: Date;
    updated_at?: Date;
}

export { search_order, checkin_picked_order };
