import {
    create_notification_usecase,
    update_notification_usecase,
} from '../../useCases';

const create_notification_controller = async (field: any) => {
    return await create_notification_usecase(field);
};
const update_notification_controller = async (id: string) => {
    return await update_notification_usecase(id);
};

export { create_notification_controller, update_notification_controller };
