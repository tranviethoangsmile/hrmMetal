import { create_order, find_all, search_order } from '../useCases/order.useCase';

const create = async (order: any) => {
    return await create_order(order);
}

const find_all_order = async () => {
    return await find_all();
}

const search_orders = async (order: any) => {
    return await search_order(order);
}

export { create, find_all_order, search_orders };