import { create_conversation_use } from '../../useCases';

const create_conversation_controller = async (data: any) => {
    return await create_conversation_use(data);
};

export { create_conversation_controller };
