interface create_event_check_interface {
    user_id: string;
    event_id: string;
    is_confirm: boolean;
}
interface search_event_checked {
    user_id: string;
    event_id: string;
}
export { create_event_check_interface, search_event_checked };
