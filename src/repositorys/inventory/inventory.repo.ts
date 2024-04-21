import { Inventory } from '../../models';

const create = async (field: any) => {
    try {
        const inventory: Inventory | null = await Inventory.create(field);
        if (inventory != null) {
            return {
                success: true,
                data: inventory,
            };
        } else {
            return {
                success: false,
                message: 'Error creating inventory',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} repository`,
        };
    }
};

const search = async (field: any) => {
    try {
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} repository`,
        };
    }
};

export { create, search };
