"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_inventory_use = exports.get_all_inventory_use = exports.search_inventory_with_name_use = exports.create_inventory_use = void 0;
const inventory_validate_1 = require("../../validates/inventory/inventory.validate");
const product_enum_1 = require("../../enum/product.enum");
const repositorys_1 = require("../../repositorys");
const departmentRepository = new repositorys_1.DepartmentRepository();
const inventoryRepository = new repositorys_1.InventoryRepository();
const update_inventory_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, inventory_validate_1.validate_update_inventory)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        if (typeof field.product !== 'string' &&
            !Object.values(product_enum_1.Products).includes(field === null || field === void 0 ? void 0 : field.product)) {
            throw new Error('product name not valid');
        }
        const result = yield inventoryRepository.update_inventory_repo(field);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(result === null || result === void 0 ? void 0 : result.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
});
exports.update_inventory_use = update_inventory_use;
const get_all_inventory_use = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventorys = yield inventoryRepository.get_all_inventory_repo();
        if (!(inventorys === null || inventorys === void 0 ? void 0 : inventorys.success)) {
            throw new Error(`${inventorys === null || inventorys === void 0 ? void 0 : inventorys.message}`);
        }
        return {
            success: true,
            data: inventorys === null || inventorys === void 0 ? void 0 : inventorys.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
});
exports.get_all_inventory_use = get_all_inventory_use;
const search_inventory_with_name_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, inventory_validate_1.validate_search_with_name)(field);
        if (isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const inventorys = yield inventoryRepository.search_inventory_with_name(field);
        if (!(inventorys === null || inventorys === void 0 ? void 0 : inventorys.success)) {
            throw new Error(`${inventorys === null || inventorys === void 0 ? void 0 : inventorys.message}`);
        }
        return {
            success: true,
            data: inventorys === null || inventorys === void 0 ? void 0 : inventorys.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
});
exports.search_inventory_with_name_use = search_inventory_with_name_use;
const create_inventory_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, inventory_validate_1.validate_create_inventory)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (typeof field.product != 'string' &&
            !Object.values(product_enum_1.Products).includes(field.product)) {
            throw new Error('Product is not valid');
        }
        const department = yield departmentRepository.getDepartmentById(field === null || field === void 0 ? void 0 : field.department_id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error(`${department === null || department === void 0 ? void 0 : department.message}`);
        }
        const inventory = yield inventoryRepository.create(field);
        if (!(inventory === null || inventory === void 0 ? void 0 : inventory.success)) {
            throw new Error(`${inventory === null || inventory === void 0 ? void 0 : inventory.message}`);
        }
        return {
            success: true,
            data: inventory === null || inventory === void 0 ? void 0 : inventory.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error.message} use`,
        };
    }
});
exports.create_inventory_use = create_inventory_use;
