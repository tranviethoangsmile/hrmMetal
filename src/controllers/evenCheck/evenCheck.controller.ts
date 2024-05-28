import {
    create_event_check_use,
    search_event_checked_use,
} from '../../useCases/eventCheck/eventCheck.useCase';

const create_event_check_controller = async (field: any) => {
    return await create_event_check_use(field);
};

const search_event_checked_controller = async (field: any) => {
    return await search_event_checked_use(field);
};

export { create_event_check_controller, search_event_checked_controller };
