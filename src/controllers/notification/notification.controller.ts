import {
    create_notification_usecase,
    update_notification_usecase,
    destroy_notification_usecase,
    search_notification_usecase,
} from '../../useCases';

const create_notification_controller = async (field: any) => {
    return await create_notification_usecase(field);
};
const update_notification_controller = async (id: string) => {
    return await update_notification_usecase(id);
};
const destroy_notification_controller = async (id: string) => {
    return await destroy_notification_usecase(id);
};

const search_notification_controller = async (id: string) => {
    return await search_notification_usecase(id);
};

export {
    create_notification_controller,
    update_notification_controller,
    destroy_notification_controller,
    search_notification_controller,
};
