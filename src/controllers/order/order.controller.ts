import {
    create_order_usecase,
    find_all_order_usecase,
    search_order_usecase,
    delete_order_by_id_usecase,
    search_order_user_usecase,
    checkin_picked_usecase,
} from '../../useCases';

const create_order_controller = async (order: any) => {
    return await create_order_usecase(order);
};

const find_all_order = async () => {
    return await find_all_order_usecase();
};

const search_orders = async (order: any) => {
    return await search_order_usecase(order);
};

const delete_order = async (id: any) => {
    return await delete_order_by_id_usecase(id);
};

const search_order_of_user = async (id: any) => {
    return await search_order_user_usecase(id);
};
const check_picked_order = async (field: any) => {
    return await checkin_picked_usecase(field);
};

export {
    create_order_controller,
    find_all_order,
    search_orders,
    delete_order,
    search_order_of_user,
    check_picked_order,
};
