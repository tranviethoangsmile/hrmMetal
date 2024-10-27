import {
    create_uniform_order_use,
    search_uniform_order_with_position_use,
    search_uniform_order_with_user_id_use,
    delete_uniform_order_with_id_use,
    get_uniform_order_detail_by_id_use,
    update_uniform_order_use,
} from '../../useCases';

const create_uniform_order_controller = async (field: any) => {
    return await create_uniform_order_use(field);
};

const search_uniform_order_with_position_controller = async (
    position: string,
) => {
    return await search_uniform_order_with_position_use(position);
};

const search_uniform_order_with_user_id_controller = async (field: any) => {
    return await search_uniform_order_with_user_id_use(field);
};

const delete_uniform_order_with_id_controller = async (id: string) => {
    return await delete_uniform_order_with_id_use(id);
};

const get_uniform_order_detail_by_id_controller = async (id: string) => {
    return await get_uniform_order_detail_by_id_use(id);
};

const update_uniform_order_controller = async (field: any) => {
    return await update_uniform_order_use(field);
};
export {
    create_uniform_order_controller,
    search_uniform_order_with_position_controller,
    search_uniform_order_with_user_id_controller,
    delete_uniform_order_with_id_controller,
    get_uniform_order_detail_by_id_controller,
    update_uniform_order_controller,
};
