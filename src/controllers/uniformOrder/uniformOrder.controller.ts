import { create_uniform_order_use } from '../../useCases';

const create_uniform_order_controller = async (field: any) => {
    return await create_uniform_order_use(field);
};

export { create_uniform_order_controller };
