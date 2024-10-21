import { UniformOrderRepository } from '../../repositorys';
import { Position, UniformSize, UniformType } from '../../enum';
import { findUserById } from '../user/user.useCase';
import {
    validate_create_uniform_order,
    validate_position,
    validation_id,
} from '../../validates';
const uniformOrderRepo = new UniformOrderRepository();
const create_uniform_order_use = async (field: any) => {
    try {
        const isValid = validate_create_uniform_order(field);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const user = await findUserById(field.user_id);
        if (!user?.success) {
            throw new Error(user?.message);
        }
        if (!Object.values(Position).includes(field.position)) {
            throw new Error(`position of user invalid`);
        }
        for (const item of field.items) {
            if (
                !Object.keys(UniformSize).includes(item.uniform_size) ||
                !Object.keys(UniformType).includes(item.uniform_type)
            ) {
                throw new Error('Invalid uniform size or type');
            }
        }
        const uniformOrder = await Promise.all(
            field.items.map((item: any) => {
                try {
                    return uniformOrderRepo.create({
                        user_id: field.user_id,
                        position: field.position,
                        date: field.date,
                        uniform_type: item.uniform_type,
                        uniform_size: item.uniform_size,
                        notes: field.notes,
                    });
                } catch (error: any) {
                    return {
                        success: false,
                        message: error.message,
                    };
                }
            }),
        );
        const successfulOrders = uniformOrder
            .filter(order => order.success)
            .map(order => order.data);
        return {
            success: true,
            data: successfulOrders, // Trả về toàn bộ mảng đơn hàng đã tạo thành công
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
};

const search_uniform_order_with_position_use = async (position: string) => {
    try {
        const isValid = validate_position(position);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        if (!Object.values(Position).includes(position)) {
            throw new Error(`position of user invalid`);
        }
        const uniformOrders =
            await uniformOrderRepo.search_all_uniform_order_by_position(
                position,
            );
        if (!uniformOrders?.success) {
            throw new Error(`${uniformOrders?.message}`);
        }
        return {
            success: true,
            data: uniformOrders.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
};

const search_uniform_order_with_user_id_use = async (user_id: string) => {
    try {
        const isValid = validation_id(user_id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }

        const uniformOrders =
            await uniformOrderRepo.search_all_uniform_order_by_user_id(user_id);
        if (!uniformOrders?.success) {
            throw new Error(`${uniformOrders?.message}`);
        }
        return {
            success: true,
            data: uniformOrders.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
};

export {
    create_uniform_order_use,
    search_uniform_order_with_position_use,
    search_uniform_order_with_user_id_use,
};
