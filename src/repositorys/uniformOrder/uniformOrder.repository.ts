import { Department, UniformOrder, User } from '../../models';
import { IUniformOrder } from '../interfaces';

class UniformOrderRepository implements IUniformOrder {
    async create(field: any) {
        try {
            const uniformOrder: UniformOrder | null = await UniformOrder.create(
                { ...field },
            );
            if (uniformOrder === null) {
                throw new Error(`create uniform order failed`);
            }
            return {
                success: true,
                data: uniformOrder,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `--${error?.message}--`,
            };
        }
    }
    async search_all_uniform_order_by_position(position: string) {
        try {
            const uniformOrders: UniformOrder[] = await UniformOrder.findAll({
                where: {
                    position: position,
                },
            });
            if (uniformOrders.length < 1) {
                throw new Error(`uniform order not found`);
            }
            return {
                success: true,
                data: uniformOrders,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `--${error?.message}--`,
            };
        }
    }
    async search_all_uniform_order_by_user_id(user_id: string) {
        try {
            const uniformOrders: UniformOrder[] = await UniformOrder.findAll({
                where: {
                    user_id: user_id,
                },
            });
            if (uniformOrders.length < 1) {
                throw new Error(`uniform order not found`);
            }
            return {
                success: true,
                data: uniformOrders,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `--${error?.message}--`,
            };
        }
    }

    async delete_uniform_order_by_id(id: string) {
        try {
            const result: number = await UniformOrder.destroy({
                where: {
                    id: id,
                },
            });
            if (result < 1) {
                throw new Error(`delete un Success`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `--${error?.message}--`,
            };
        }
    }

    async get_order_detail_by_id(id: string) {
        try {
            const uniformOrder: UniformOrder | null =
                await UniformOrder.findByPk(id, {
                    attributes: [
                        'id',
                        'user_id',
                        'position',
                        'date',
                        'delivery_date',
                        'order_status',
                        'notes',
                        'uniform_type',
                        'uniform_size',
                        'quantity',
                    ],
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'position', 'avatar'],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['name'],
                            },
                        ],
                    },
                });
            if (uniformOrder === null) {
                throw new Error(`uniform order not found`);
            }
            return {
                success: true,
                data: uniformOrder,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `--${error?.message}--`,
            };
        }
    }

    async update_uniform_order_by_field(field: any) {
        try {
            const result = await UniformOrder.update(
                {
                    ...field,
                },
                {
                    where: {
                        id: field.id,
                    },
                },
            );
            if (result[0] !== 1) {
                throw new Error(
                    `Update not successful, affected rows: ${result[0]}`,
                );
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `--${error?.message}--`,
            };
        }
    }
}

export default UniformOrderRepository;
