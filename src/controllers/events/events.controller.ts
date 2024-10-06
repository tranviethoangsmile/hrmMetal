import {
    create_events_use,
    delete_events_use,
    update_events_use,
    search_event_by_id_use,
    get_all_events_use,
} from '../../useCases';

const create_events_controller = async (field: any) => {
    return await create_events_use(field);
};

const delete_event_controller = async (id: string) => {
    return await delete_events_use(id);
};

const update_events_controller = async (field: any) => {
    return await update_events_use(field);
};

const search_event_by_id_controller = async (id: string) => {
    return await search_event_by_id_use(id);
};

const get_all_events_controller = async () => {
    return await get_all_events_use();
};

export {
    create_events_controller,
    delete_event_controller,
    update_events_controller,
    search_event_by_id_controller,
    get_all_events_controller,
};
