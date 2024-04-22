import { Inventory } from '../../models';

const update_inventory_repo = async (field: any) => {
    try {
        const result = await Inventory.update(
            { ...field },
            {
                where: {
                    product: field?.product,
                },
            },
        );
        if (result.toString() === '1') {
            return {
                success: true,
            };
        } else {
            return {
                success: false,
                message: 'Error updating inventory',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} repository`,
        };
    }
};

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

const search_inventory_with_name = async (field: any) => {
    try {
        const inventorys: Inventory[] | null = await Inventory.findAll({
            where: { ...field },
            attributes: ['product', 'quantity'],
        });
        if (inventorys != null) {
            return {
                success: true,
                data: inventorys,
            };
        } else {
            return {
                success: false,
                message: 'Error search inventory',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} repository`,
        };
    }
};

const get_all_inventory_repo = async () => {
    try {
        const inventorys: Inventory[] | null = await Inventory.findAll();
        if (inventorys != null) {
            return {
                success: true,
                data: inventorys,
            };
        } else {
            return {
                success: false,
                message: 'Error search inventory',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} repository`,
        };
    }
};

export {
    create,
    search_inventory_with_name,
    get_all_inventory_repo,
    update_inventory_repo,
};
