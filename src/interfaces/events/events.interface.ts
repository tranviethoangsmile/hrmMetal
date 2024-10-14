interface create_events_interface {
    name: string;
    description: string;
    date_start: string;
    date_end: string;
    position: string;
    media?: string;
    is_safety?: boolean;
    is_active?: boolean;
}
interface update_events_interface {
    id: string;
    name?: string;
    description?: string;
    is_safety?: boolean;
    is_active?: boolean;
}

interface get_events_with_position {
    position: string;
}
export {
    create_events_interface,
    update_events_interface,
    get_events_with_position,
};
