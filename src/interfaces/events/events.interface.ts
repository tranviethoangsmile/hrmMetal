interface create_events_interface {
    name: string;
    description: string;
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
export { create_events_interface, update_events_interface };
