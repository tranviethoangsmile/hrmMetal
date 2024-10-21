import { UniformOrder, User } from '../../models';
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
}

export default UniformOrderRepository;
