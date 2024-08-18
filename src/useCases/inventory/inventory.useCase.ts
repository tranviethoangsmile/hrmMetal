import {
    create_inventory,
    search_with_name,
    update_inventory,
} from '../../interfaces/inventory/inventory.interface';
import {
    validate_create_inventory,
    validate_search_with_name,
    validate_update_inventory,
} from '../../validates/inventory/inventory.validate';
import { Products } from '../../enum/product.enum';
import { InventoryRepository, DepartmentRepository } from '../../repositorys';
const departmentRepository = new DepartmentRepository();
const inventoryRepository = new InventoryRepository();
const update_inventory_use = async (field: update_inventory) => {
    try {
        const isValid = validate_update_inventory(field);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        if (
            typeof field.product !== 'string' &&
            !Object.values(Products).includes(field?.product)
        ) {
            throw new Error('product name not valid');
        }
        const result = await inventoryRepository.update_inventory_repo(field);
        if (!result?.success) {
            throw new Error(result?.message);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
};

const get_all_inventory_use = async () => {
    try {
        const inventorys = await inventoryRepository.get_all_inventory_repo();
        if (!inventorys?.success) {
            throw new Error(`${inventorys?.message}`);
        }
        return {
            success: true,
            data: inventorys?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
};

const search_inventory_with_name_use = async (field: search_with_name) => {
    try {
        const isValid = validate_search_with_name(field);
        if (isValid.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const inventorys = await inventoryRepository.search_inventory_with_name(
            field,
        );
        if (!inventorys?.success) {
            throw new Error(`${inventorys?.message}`);
        }
        return {
            success: true,
            data: inventorys?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
};

const create_inventory_use = async (field: create_inventory) => {
    try {
        const isValid = validate_create_inventory(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        if (
            typeof field.product != 'string' &&
            !Object.values(Products).includes(field.product)
        ) {
            throw new Error('Product is not valid');
        }
        const department = await departmentRepository.getDepartmentById(
            field?.department_id,
        );
        if (!department?.success) {
            throw new Error(`${department?.message}`);
        }
        const inventory = await inventoryRepository.create(field);
        if (!inventory?.success) {
            throw new Error(`${inventory?.message}`);
        }
        return {
            success: true,
            data: inventory?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
};

export {
    create_inventory_use,
    search_inventory_with_name_use,
    get_all_inventory_use,
    update_inventory_use,
};
