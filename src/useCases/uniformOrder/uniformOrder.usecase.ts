import { UniformOrderRepository } from '../../repositorys';
import { Position, UniformSize, UniformType } from '../../enum';
import { findUserById } from '../index';
import {
    validate_create_uniform_order,
    validate_position,
    validation_id,
    validate_update_uniform_order,
    validate_seach_order_processing,
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
                !Object.values(UniformSize).includes(item.uniform_size) ||
                !Object.values(UniformType).includes(item.uniform_type)
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
                        quantity: item.quantity,
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
        if (successfulOrders.length < 1) {
            throw new Error('No uniform orders created');
        }
        return {
            success: true,
            data: successfulOrders,
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

const search_uniform_order_with_user_id_use = async (field: any) => {
    try {
        const isValid = validate_seach_order_processing(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }

        const uniformOrders =
            await uniformOrderRepo.search_all_uniform_order_by_user_id(field);
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

const delete_uniform_order_with_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const unoformOrder = await get_uniform_order_detail_by_id_use(id);
        if (!unoformOrder?.success) {
            throw new Error(`${unoformOrder?.message}`);
        }
        const result = await uniformOrderRepo.delete_uniform_order_by_id(id);
        if (!result?.success) {
            throw new Error(`${result?.message}`);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
};

const get_uniform_order_detail_by_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const uniformOrderDetail =
            await uniformOrderRepo.get_order_detail_by_id(id);
        if (!uniformOrderDetail?.success) {
            throw new Error(`${uniformOrderDetail?.message}`);
        }
        return {
            success: true,
            data: uniformOrderDetail?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
};

const update_uniform_order_use = async (field: any) => {
    try {
        const isValid = validate_update_uniform_order(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const uniformOrder = await get_uniform_order_detail_by_id_use(field.id);
        if (!uniformOrder?.success) {
            throw new Error(`${uniformOrder?.message}`);
        }
        if (field.uniform_size) {
            if (!Object.keys(UniformSize).includes(field.uniform_size)) {
                throw new Error('Invalid uniform size');
            }
        }
        const result = await uniformOrderRepo.update_uniform_order_by_field({
            ...field,
        });
        if (!result?.success) {
            throw new Error(`${result?.message}`);
        }
        return {
            success: true,
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
    delete_uniform_order_with_id_use,
    get_uniform_order_detail_by_id_use,
    update_uniform_order_use,
};
