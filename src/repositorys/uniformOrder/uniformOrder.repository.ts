import { UniformOrder, User } from '../../models';
import { IUniformOrder } from '../interfaces';

class UniformOrderRepository implements IUniformOrder {
    async create(field: any) {
        console.log(field);
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
}

export default UniformOrderRepository;
