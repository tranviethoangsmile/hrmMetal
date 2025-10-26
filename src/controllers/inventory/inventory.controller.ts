import {
    create_inventory_use,
    search_inventory_with_name_use,
    get_all_inventory_use,
    update_inventory_use,
} from '../../useCases/inventory/inventory.useCase';

const create_inventory_controller = async (field: any) => {
    return await create_inventory_use(field);
};
const search_inventory_with_name_controller = async (field: any) => {
    return await search_inventory_with_name_use(field);
};
const get_all_inventory_controller = async () => {
    return await get_all_inventory_use();
};
const update_inventory_controller = async (field: any) => {
    return await update_inventory_use(field);
};
export {
    create_inventory_controller,
    search_inventory_with_name_controller,
    get_all_inventory_controller,
    update_inventory_controller,
};
