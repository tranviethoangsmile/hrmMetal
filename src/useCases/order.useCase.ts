import {
    create,
    find_all_order,
    find_order,
    delete_order,
} from '../repositorys/order.repository';
import {
    validate_create_order,
    validate_search_order,
} from '../helper/order.validate.helper';
import { validation_id } from '../helper';
import { search_order } from '../interfaces/order.interface';
import { userFindById } from '../repositorys/user.repository';
import { find_food_by_id } from '../repositorys/food.repository';
import { find_canteen_by_id } from '../repositorys/canteen.repository';
import e from 'cors';
const create_order = async (order: any) => {
    try {
        const valid = validate_create_order(order);
        if (!valid.error) {
            const user = await userFindById(order.user_id);
            const canteen = await find_canteen_by_id(order.canteen_id);
            const food = await find_food_by_id(order.food_id);
            if (user != null && canteen != null && food != null) {
                const order_data = {
                    ...order,
                    user: user,
                    canteen: canteen,
                    food: food,
                };
                console.log(order_data.date);
                const created_order = await create(order_data);
                if (created_order) {
                    return {
                        created_order,
                    };
                } else {
                    return {
                        success: false,
                        message: 'create order failed',
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'User or Canteen or Food not found',
                };
            }
        } else {
            return {
                success: false,
                message: 'data not valid',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error creating order',
        };
    }
};

const find_all = async () => {
    try {
        const orders = await find_all_order();
        if (orders?.success) {
            return orders;
        } else {
            return {
                success: false,
                message: 'order not found',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error finding orders',
        };
    }
};

const search_order = async (order: search_order) => {
    try {
        const valid = validate_search_order(order);
        if (!valid.error) {
            const orders = await find_order(order);
            if (orders != null) {
                return {
                    success: true,
                    orders,
                };
            } else {
                return {
                    success: false,
                    message: 'order not found',
                };
            }
        } else {
            return {
                success: false,
                message: 'data not valid',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error searching orders',
        };
    }
};

const delete_order_by_id = async (id: string) => {
    try {
        const valid = await validation_id(id);
        if (!valid.error) {
            const result = await delete_order(id);
            if (result) {
                return {
                    success: true,
                };
            }else {
                return {
                    success: false,
                    message: 'delete failed',
                };
            }
        }else {
            return {
                success: false,
                message: 'id not valid',
            };
        }
    } catch (error) {
        return error;
    }
   
};

export { create_order, find_all, search_order, delete_order_by_id };
