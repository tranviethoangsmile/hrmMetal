import { Department, Inventory } from '../../models';
import { IInventoryRepository } from '../interfaces/inventory/IInventoryRepository';
class InventoryRepository implements IInventoryRepository {
    async update_inventory_repo(field: any) {
        try {
            const result = await Inventory.update(
                { ...field },
                {
                    where: {
                        product: field?.product,
                        department_id: field?.department_id,
                    },
                },
            );
            if (result.toString() !== '1') {
                throw new Error('Update inventory failed');
            }
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

    async create(field: any) {
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
    }

    async search_inventory_with_name(field: any) {
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
            if (inventorys.length < 0) {
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

    async get_all_inventory_repo() {
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
}

export default InventoryRepository;
