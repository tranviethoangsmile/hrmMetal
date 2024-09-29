import { create_fcm_token_use } from '../../useCases';

const create_fcm_token_controller = async (field: any) => {
    return await create_fcm_token_use(field);
};

export { create_fcm_token_controller };
