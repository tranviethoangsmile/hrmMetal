import { create } from '../../useCases/conversation/conversation.useCase';

const create_conversation = async (data: any) => {
    return await create(data);
};

export { create_conversation };
