import { Order, User, Food, Canteen } from '../models';
import Department from '../models/department.model';

const create = async (order: any) => {
    try {
        const new_order = await Order.create({
            ...order,
        });
        if (new_order) {
            return {
                success: true,
                new_order,
            };
        } else {
            return {
                success: false,
                error: 'Error creating order',
            };
        }
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

const find_all_order = async () => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'employee_id'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: Food,
                    as: 'food',
                    attributes: ['name'],
                },
                {
                    model: Canteen,
                    as: 'canteen',
                    attributes: ['id', 'factory_name'],
                },
            ],
        });
        if (orders.length > 0) {
            return {
                success: true,
                orders,
            };
        } else {
            return {
                success: false,
                error: 'Order not found',
            };
        }
    } catch (error) {
        return {
            error,
        };
    }
};

const find_order = async (field: any) => {
    try {
        const orders = await Order.findAll({
            where: {
                ...field,
            }, 
            attributes: ['created_at',],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'employee_id'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: Food,
                    as: 'food',
                    attributes: ['name'],
                },
                {
                    model: Canteen,
                    as: 'canteen',
                    attributes: ['id', 'factory_name'],
                },
            ],
        });
        if (orders.length > 0) {
            return {
                orders,
            };
        } else {
            return {
                success: false,
                error: 'Order not found',
            };
        }
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

export { create, find_all_order, find_order };
