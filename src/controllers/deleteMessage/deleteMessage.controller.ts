import { create_delete_message_use } from '../../useCases';

const create_delete_message_cotroller = async (field: any) => {
    return create_delete_message_use(field);
};

export { create_delete_message_cotroller };
