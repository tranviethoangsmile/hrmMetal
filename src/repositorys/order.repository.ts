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

const delete_order = async (id: string) => {
    try {
        const order = await Order.findOne({
            where: {
                id,
            },
        });
        if (order != null) {
            const result = await Order.destroy({
                where: {
                    id,
                },
            });
            if (result === 1) {
                return {
                    success: true,
                };
            } else {
                return {
                    success: false,
                    error: 'delete order failed',
                };
            }
        } else {
            return {
                success: false,
                error: 'Order not exist',
            };
        }
    } catch (error) {
        return error;
    }
};


// building....
const search_order_for_user = (data : any) => {
    try {
        const month = moment(data.date).format('DD');
        const year = moment(data.date).format('YYYY');
        console.log(month, year);
        const orders = Order.findAll({
            where: {
                [Op.and]: [
                    {
                        user_id: data.user_id,
                    }, 
                    {
                        date: {
                            [Op.gte]: new Date(`S{year}/${month}/01`)
                        }
                    },
                    {
                        date: {
                            [Op.lt]: new Date (`${year}/${month}/31`)
                        },
                    },
                ]
            }
        })
    } catch (error) {
        return {
            error
        }
    }
}

export { create, find_all_order, find_order, delete_order, search_order_for_user };
