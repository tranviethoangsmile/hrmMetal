import { create } from '../../repositorys/inventory/inventory.repo';
import { create_inventory } from '../../interfaces/inventory/inventory.interface';
import { validate_create_inventory } from '../../validates/inventory/inventory.validate';
import { Products } from '../../enum/product.enum';

const create_inventory_use = async (field: create_inventory) => {
    try {
        const isValid = validate_create_inventory(field);
        if (!isValid?.error) {
            if (
                typeof field.product === 'string' &&
                Object.values(Products).includes(field.product)
            ) {
                const inventory = await create(field);
                if (inventory?.success) {
                    return {
                        success: true,
                        data: inventory?.data,
                    };
                } else {
                    return {
                        success: false,
                        message: `${inventory?.message}`,
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'product name not valid',
                };
            }
        } else {
            return {
                success: false,
                message: `${isValid?.error?.message}`,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
};

export { create_inventory_use };
