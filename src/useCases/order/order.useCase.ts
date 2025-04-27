import { validation_id } from '../../validates';
import { search_order } from '../../interfaces';
import {
    validate_create_order,
    validate_search_order,
    validate_checkin_picked_order,
} from '../../validates';
import { shift_work } from '../../enum';
import { create_notification_usecase } from '../notification/notification.usecase';
import { OrderRepository, UserRepository } from '../../repositorys';
const userRepository = new UserRepository();
const orderRepository = new OrderRepository();
const create_order = async (order: any) => {
    try {
        const valid = validate_create_order(order);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const user = await userRepository.userFindById(order.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        if (!Object.keys(shift_work).includes(order.dayOrNight)) {
            throw new Error('shift work not valid');
        }
        const created_order = await orderRepository.create(order);
        if (!created_order?.success) {
            throw new Error(`${created_order?.message}`);
        }
        try {
            const field_notification = {
                title: 'Order',
                user_id: created_order?.data?.user_id,
                type: 'SUCCESS',
                message: 'Order success',
            };
            const notification = await create_notification_usecase(
                field_notification,
            );
            if (!notification?.success) {
                throw new Error(notification?.message);
            }
        } catch (error: any) {
            console.log(`notification: ${error?.message}`);
        }
        return {
            success: true,
            data: created_order?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all = async () => {
    try {
        const orders = await orderRepository.find_all_order();
        if (!orders?.success) {
            throw new Error(`${orders?.message}`);
        }
        return {
            success: true,
            data: orders?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_order = async (order: search_order) => {
    try {
        const valid = validate_search_order(order);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const orders = await orderRepository.find_order(order);
        if (!orders.success) {
            throw new Error(`${orders?.message}`);
        }
        return {
            success: true,
            data: orders?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const delete_order_by_id = async (id: string) => {
    try {
        const valid = validation_id(id);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const order = await orderRepository.find_one_order(id);
        if (!order?.success) {
            throw new Error(`${order?.message}`);
        }
        const date_of_order = order?.data?.date;
        if (date_of_order == undefined) {
            throw new Error('order delete failed');
        }
        const orderDate = new Date(date_of_order);
        const currentDate = new Date();
        if (orderDate.getTime() < currentDate.getTime()) {
            throw new Error('order delete failed because it was confirmed');
        }
        const result = await orderRepository.delete_order(id);
        if (!result?.success) {
            throw new Error(`${result?.message}`);
        }
        return {
            success: true,
            message: result?.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_order_user = async (id: any) => {
    try {
        const valid = validation_id(id.user_id);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const orders = await orderRepository.search_order_for_user_in_month(id);
        if (!orders?.success) {
            throw new Error(`${orders?.message}`);
        }
        return {
            success: true,
            data: orders?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const checkin_picked = async (field: any) => {
    try {
        const valid = validate_checkin_picked_order(field);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const order = await orderRepository.find_order(field);
        if (!order?.success) {
            throw new Error(`${order?.message}`);
        }
        const picked_order = await orderRepository.checkin_picked_order(field);
        if (!picked_order.success) {
            throw new Error(`${picked_order?.message}`);
        }
        try {
            const field_notification = {
                title: 'Order picked',
                user_id: field.user_id,
                type: 'SUCCESS',
                message: 'Order picked success',
            };
            const notification = await create_notification_usecase(
                field_notification,
            );
            if (!notification?.success) {
                throw new Error(notification?.message);
            }
        } catch (error: any) {
            console.log(`notification: ${error?.message}`);
        }
        return {
            success: picked_order?.success,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
export {
    create_order,
    find_all,
    search_order,
    delete_order_by_id,
    search_order_user,
    checkin_picked,
};
