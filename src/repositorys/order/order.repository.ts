import { Order, User, Canteen } from '../../models';
import Department from '../../models/department.model';
import moment from 'moment-timezone';
import { Op } from 'sequelize';
const create = async (order: any) => {
    try {
        const new_order: Order | null = await Order.create({
            ...order,
        });
        if (new_order != null) {
            return {
                success: true,
                data: new_order,
            };
        } else {
            return {
                success: false,
                messgae: 'create order failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all_order = async () => {
    try {
        const orders: Order[] | null = await Order.findAll({
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
            ],
        });
        if (orders != null) {
            return {
                success: true,
                data: orders,
            };
        } else {
            return {
                success: false,
                message: 'Order not found',
            };
        }
    } catch (error: any) {
        return {
            success: true,
            message: error?.message,
        };
    }
};

const find_one_order = async (id: any) => {
    try {
        const order: Order | null = await Order.findOne({
            where: {
                id: id,
            },
            attributes: ['id', 'date'],
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
            ],
        });

        if (order != null) {
            return {
                success: true,
                data: order,
            };
        } else {
            return {
                success: false,
                message: 'Order not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_order = async (field: any) => {
    try {
        const orders: Order[] | null = await Order.findAll({
            where: {
                ...field,
            },
            attributes: ['id', 'date'],
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
            ],
        });
        if (orders != null) {
            return {
                success: true,
                data: orders,
            };
        } else {
            return {
                success: false,
                message: 'Order not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const delete_order = async (id: string) => {
    try {
        const result = await Order.destroy({
            where: {
                id: id,
            },
        });
        if (result === 1) {
            return {
                success: true,
                message: 'delete order was successful',
            };
        } else {
            return {
                success: false,
                message: 'delete order failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_order_for_user_in_month = async (id: any) => {
    try {
        const year = moment().format('YYYY');
        const month = moment().format('MM');
        const orders: Order[] | null = await Order.findAll({
            where: {
                [Op.and]: [
                    {
                        user_id: id.user_id,
                    },
                    {
                        date: {
                            [Op.gte]: moment().format(`${year}/${month}/01`),
                        },
                    },
                    {
                        date: {
                            [Op.lt]: moment().format(`${year}/${month}/31`),
                        },
                    },
                ],
            },
        });

        if (orders != null) {
            return {
                success: true,
                data: orders,
            };
        } else {
            return {
                success: false,
                message: 'Order not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const checkin_picked_order = async (field: any) => {
    try {
        const order_picked = await Order.update(
            {
                isPicked: true,
            },
            {
                where: {
                    user_id: field.user_id,
                    date: field.date,
                },
            },
        );
        if (order_picked[0] > 0) {
            return {
                success: true,
                message: 'picked success',
            };
        } else {
            return {
                success: false,
                message: 'not success',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export {
    create,
    find_all_order,
    find_order,
    delete_order,
    search_order_for_user_in_month,
    find_one_order,
    checkin_picked_order,
};
