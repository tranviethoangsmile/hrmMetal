import {
    create_new_message,
    search_all_message_of_conversation_use,
} from '../../useCases';

const create_message_controller = async (data: any) => {
    return await create_new_message(data);
};

const search_all_message_of_conversation_controller = async (id: string) => {
    return await search_all_message_of_conversation_use(id);
};

export {
    create_message_controller,
    search_all_message_of_conversation_controller,
};
