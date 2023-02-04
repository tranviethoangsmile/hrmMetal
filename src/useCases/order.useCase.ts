import { validation_id } from '../helper';
import { search_order } from '../interfaces/order.interface';
import { userFindById } from '../repositorys/user.repository';
import { find_food_by_id } from '../repositorys/food.repository';
import { find_canteen_by_id } from '../repositorys/canteen.repository';
import {
    create,
    find_all_order,
    find_order,
    delete_order,
    search_order_for_user_in_month,
} from '../repositorys/order.repository';
import {
    validate_create_order,
    validate_search_order,
} from '../helper/order.validate.helper';
import { User } from '../models';
const create_order = async (order: any) => {
    try {
        const valid = validate_create_order(order);
        if (!valid.error) {
            const user = await userFindById(order.user_id);
            const canteen = await find_canteen_by_id(order.canteen_id);
            const food = await find_food_by_id(order.food_id);
            if (user?.success && canteen?.success && food?.success) {
                const created_order = await create(order);
                if (created_order?.success) {
                    return {
                        success: true,
                        data: created_order?.data,
                    };
                } else {
                    return {
                        success: false,
                        message: created_order?.message,
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
            success: false,
            message: error,
        };
    }
};

const find_all = async () => {
    try {
        const orders = await find_all_order();
        if (orders?.success) {
            return {
                success: true,
                data: orders?.data,
            };
        } else {
            return {
                success: false,
                message: orders?.message,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const search_order = async (order: search_order) => {
    try {
        const valid = validate_search_order(order);
        if (!valid.error) {
            const orders = await find_order(order);
            if (orders.success) {
                return {
                    success: true,
                    data: orders?.data,
                };
            } else {
                return {
                    success: false,
                    message: orders?.message,
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
            success: false,
            message: error,
        };
    }
};

const delete_order_by_id = async (id: string) => {
    try {
        const valid = validation_id(id);
        if (!valid.error) {
            const result = await delete_order(id);
            console.log(result);
            if (result?.success) {
                return {
                    success: true,
                };
            } else {
                return {
                    success: false,
                    message: result?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'id not valid delete',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const search_order_user = async (id: any) => {
    try {
        const valid = validation_id(id.user_id);
        if (!valid.error) {
            const orders = await search_order_for_user_in_month(id);
            if (orders?.success) {
                return {
                    success: true,
                    data: orders?.data,
                };
            } else {
                return {
                    success: false,
                    message: orders?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'Id not valid search',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export {
    create_order,
    find_all,
    search_order,
    delete_order_by_id,
    search_order_user,
};
