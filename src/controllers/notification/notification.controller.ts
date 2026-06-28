import {
    update_notification_usecase,
    destroy_notification_usecase,
    search_notification_usecase,
    search_notification_of_user_usecase,
} from '../../useCases';
const update_notification_controller = async (id: string) => {
    return await update_notification_usecase(id);
};
const destroy_notification_controller = async (id: string) => {
    return await destroy_notification_usecase(id);
};

const search_notification_controller = async (id: string) => {
    return await search_notification_usecase(id);
};
const search_notification_of_user_controller = async (id: string) => {
    return await search_notification_of_user_usecase(id);
};

export {
    update_notification_controller,
    destroy_notification_controller,
    search_notification_controller,
    search_notification_of_user_controller,
};
