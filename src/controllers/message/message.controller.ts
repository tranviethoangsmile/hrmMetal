import { create_new_message } from '../../useCases/message/message.useCase';

const create_message_controller = async (data: any) => {
    return await create_new_message(data);
};

export { create_message_controller };
