import {
    create_order,
    find_all,
    search_order,
    delete_order_by_id,
    search_order_user,
} from '../../useCases/order/order.useCase';

const create = async (order: any) => {
    return await create_order(order);
};

const find_all_order = async () => {
    return await find_all();
};

const search_orders = async (order: any) => {
    return await search_order(order);
};

const delete_order = async (id: any) => {
    return await delete_order_by_id(id);
};

const search_order_of_user = async (id: any) => {
    return await search_order_user(id);
};

export {
    create,
    find_all_order,
    search_orders,
    delete_order,
    search_order_of_user,
};
