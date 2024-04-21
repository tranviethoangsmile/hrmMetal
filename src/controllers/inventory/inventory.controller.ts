import { create_inventory_use } from '../../useCases/inventory/inventory.useCase';

const create = async (field: any) => {
    return await create_inventory_use(field);
};
export { create };
