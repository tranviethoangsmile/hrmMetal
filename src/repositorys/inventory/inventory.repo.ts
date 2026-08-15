import { Department, Inventory } from '../../models';
import { IInventoryRepository } from '../interfaces';
import { delCache } from '../../utils';
const KEY_CACHE = `all_inventory`;
class InventoryRepository implements IInventoryRepository {
    async UPDATE_INVENTORY(field: any) {
        try {
            const where = field?.id
                ? { id: field?.id }
                : {
                      product: field?.product,
                      department_id: field?.department_id,
                  };
            const result = await Inventory.update(
                { ...field },
                {
                    where,
                }
            );
            if (result.toString() !== '1') {
                throw new Error('Update inventory failed');
            }
            await delCache(KEY_CACHE);
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error.message} repository`,
            };
        }
    }

    async CREATE(field: any) {
        try {
            const inventory: Inventory | null = await Inventory.create(field);
            if (inventory === null) {
                throw new Error(`Error creating inventory`);
            }
            await delCache(KEY_CACHE);
            return {
                success: true,
                data: inventory,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error.message} repository`,
            };
        }
    }

    async SEARCH_INVENTORY_WITH_NAME(field: any) {
        try {
            const inventorys: Inventory[] | null = await Inventory.findAll({
                where: { ...field },
                attributes: ['product', 'quantity', 'department_id'],
                include: [
                    {
                        model: Department,
                        attributes: ['name'],
                    },
                ],
            });
            if (inventorys === null || inventorys.length < 1) {
                throw new Error('Inventory not Exits');
            }
            return {
                success: true,
                data: inventorys,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error.message} repository`,
            };
        }
    }

    async GET_ALL_INVENTORY() {
        try {
            const inventorys: Inventory[] | null = await Inventory.findAll({
                attributes: ['product', 'quantity', 'department_id'],
                include: [
                    {
                        model: Department,
                        attributes: ['name'],
                    },
                ],
            });
            if (inventorys === null || inventorys.length < 1) {
                throw new Error('inventory not found');
            }
            return {
                success: true,
                data: inventorys,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error.message} repository`,
            };
        }
    }
    async GET_INVENTORY_BY_ID(id: string) {
        try {
            const inventory: Inventory | null = await Inventory.findByPk(id);
            if (!inventory) {
                throw new Error(`inventory not avaiable`);
            }
            return {
                success: true,
                data: inventory,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error.message} repository`,
            };
        }
    }
}

export default InventoryRepository;
