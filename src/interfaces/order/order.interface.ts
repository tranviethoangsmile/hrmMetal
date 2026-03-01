interface search_order {
    id?: string;
    date?: string;
    user_id?: string;
    position?: string;
    created_at?: Date;
    updated_at?: Date;
}
interface checkin_picked_order {
    date: string;
    user_id: string;
}

interface create_order {
    date: string;
    dayOrNight: string;
    user_id: string;
    position: string;
}

export { search_order, checkin_picked_order, create_order };
