import { Order, User } from '../../models';
import Department from '../../models/department.model';
import moment from 'moment-timezone';
import { Op } from 'sequelize';
import { IOrderRepository } from '../interfaces/order/IOrderRepository';
class OrderRepository implements IOrderRepository {
    async create(order: any) {
        try {
            const new_order: Order | null = await Order.create({
                ...order,
            });
            if (new_order === null) {
                throw new Error(`create order failed`);
            }
            return {
                success: true,
                data: new_order,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async find_all_order() {
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
            if (orders === null || orders.length < 1) {
                throw new Error(`order not found`);
            }
            return {
                success: true,
                data: orders,
            };
        } catch (error: any) {
            return {
                success: true,
                message: error?.message,
            };
        }
    }

    async find_one_order(id: any) {
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

            if (order === null) {
                throw new Error(`order not found`);
            }
            return {
                success: true,
                data: order,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async find_order(field: any) {
        try {
            const orders: Order[] | null = await Order.findAll({
                where: {
                    ...field,
                },
                attributes: ['id', 'date', 'dayOrNight'],
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
            if (orders === null || orders.length < 1) {
                throw new Error(`order not found`);
            }
            return {
                success: true,
                data: orders,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async delete_order(id: string) {
        try {
            const result: number = await Order.destroy({
                where: {
                    id: id,
                },
            });
            if (result !== 1) {
                throw new Error(`delete order failed`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async search_order_for_user_in_month(id: any) {
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
                                [Op.gte]: moment().format(
                                    `${year}/${month}/01`,
                                ),
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

            if (orders === null || orders.length < 1) {
                throw new Error(`order not found`);
            }
            return {
                success: true,
                data: orders,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
    async checkin_picked_order(field: any) {
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
            if (order_picked[0] < 1) {
                throw new Error(`picked not success`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
}

export default OrderRepository;
