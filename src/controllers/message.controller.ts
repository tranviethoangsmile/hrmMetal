import { create_new_message } from '../useCases/message.useCase';

const create = async (data: any) => {
    return await create_new_message(data);
};

export { create };
