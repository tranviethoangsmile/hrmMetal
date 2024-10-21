import {
    create_uniform_order_use,
    search_uniform_order_with_position_use,
    search_uniform_order_with_user_id_use,
} from '../../useCases';

const create_uniform_order_controller = async (field: any) => {
    return await create_uniform_order_use(field);
};

const search_uniform_order_with_position_controller = async (
    position: string,
) => {
    return await search_uniform_order_with_position_use(position);
};

const search_uniform_order_with_user_id_controller = async (
    user_id: string,
) => {
    return await search_uniform_order_with_user_id_use(user_id);
};

export {
    create_uniform_order_controller,
    search_uniform_order_with_position_controller,
    search_uniform_order_with_user_id_controller,
};
