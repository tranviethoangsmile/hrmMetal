interface create_safety_check_interface {
    user_id: string;
    event_id: string;
    feedback?: string;
    is_safety: boolean;
    is_at_home: boolean;
    is_can_work: boolean;
}

interface search_safety_checked_interface {
    user_id: string;
    event_id: string;
}
export { create_safety_check_interface, search_safety_checked_interface };
