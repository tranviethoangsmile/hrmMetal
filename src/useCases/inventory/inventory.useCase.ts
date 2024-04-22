import {
    create,
    search_inventory_with_name,
    get_all_inventory_repo,
    update_inventory_repo,
} from '../../repositorys/inventory/inventory.repo';
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

const update_inventory_use = async (field: update_inventory) => {
    try {
        const isValid = validate_update_inventory(field);
        if (!isValid?.error) {
            if (
                typeof field.product === 'string' &&
                Object.values(Products).includes(field?.product)
            ) {
                const result = await update_inventory_repo(field);
                if (result?.success) {
                    return {
                        success: true,
                    };
                } else {
                    return {
                        success: false,
                        message: result?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message: `product not valid`,
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

const get_all_inventory_use = async () => {
    try {
        const inventorys = await get_all_inventory_repo();
        if (inventorys?.success) {
            return {
                success: true,
                data: inventorys?.data,
            };
        } else {
            return {
                success: false,
                message: inventorys?.message,
            };
        }
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
        if (!isValid.error) {
            if (
                typeof field.product === 'string' &&
                Object.values(Products).includes(field?.product)
            ) {
                const inventorys = await search_inventory_with_name(field);
                if (inventorys?.success) {
                    return {
                        success: true,
                        data: inventorys?.data,
                    };
                } else {
                    return {
                        success: false,
                        message: inventorys?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message: `product not valid`,
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

export {
    create_inventory_use,
    search_inventory_with_name_use,
    get_all_inventory_use,
    update_inventory_use,
};
