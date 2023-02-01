import { Order, User, Food, Canteen } from '../models';
import Department from '../models/department.model';
import moment from 'moment-timezone';
import { Op } from 'sequelize';
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
                    attributes: ['id','name', 'employee_id'],
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

        console.log(orders)
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
            attributes: ['date'],
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
                success: true,
                data: orders,
            };
        } else {
            return {
                success: false,
                message: 'Order not found',
            };
        }
    } catch (error) {
        return {
            error,
        };
    }
};

const delete_order = async (id: string) => {
    try {
        const order = await Order.findOne({
            where: {
                id: id
            },
        });
        if (order != null) {
            const result = await Order.destroy({
                where: {
                    id:id,
                },
            });
            if (result === 1) {
                return {
                    success: true,
                };
            } else {
                return {
                    success: false,
                    message: 'delete order failed',
                };
            }
        } else {
            return {
                success: false,
                message: 'Order not exist',
            };
        }
    } catch (error) {
        return {
            error
        };
    }
};


// building....
const search_order_for_user_in_month = async (id : any) => {
    try {
        const year = moment().format('YYYY');
        const month = moment().format('MM');
        const orders = await Order.findAll({
            where: {
                [Op.and]: [
                    {
                        user_id: id.user_id,
                    }, 
                    {
                        date: {
                            [Op.gte]: moment().format(`${year}/${month}/01`)
                        }
                    },
                    {
                        date: {
                            [Op.lt]: moment().format(`${year}/${month}/31`)
                        },
                    },
                ]
            }
        })
        console.log(orders.length)
        if (orders.length > 0) {
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
    } catch (error) {
        return {
            error,
        };
    }
}

export { create, find_all_order, find_order, delete_order, search_order_for_user_in_month };
