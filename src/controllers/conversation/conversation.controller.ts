import {
    create_conversation_use,
    create_delete_conversation_use,
    create_conversation_group_use,
} from '../../useCases';

const create_conversation_controller = async (field: any) => {
    return await create_conversation_use(field);
};

const create_conversation_group_controller = async (data: any) => {
    return await create_conversation_group_use(data);
};

const delete_conversation_controller = async (field: any) => {
    return await create_delete_conversation_use(field);
};

export {
    create_conversation_controller,
    delete_conversation_controller,
    create_conversation_group_controller,
};
