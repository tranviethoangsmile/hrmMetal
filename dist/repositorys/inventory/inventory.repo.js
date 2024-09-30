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
const models_1 = require("../../models");
class InventoryRepository {
    update_inventory_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Inventory.update(Object.assign({}, field), {
                    where: {
                        product: field === null || field === void 0 ? void 0 : field.product,
                        department_id: field === null || field === void 0 ? void 0 : field.department_id,
                    },
                });
                if (result.toString() !== '1') {
                    throw new Error('Update inventory failed');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error.message} repository`,
                };
            }
        });
    }
    create(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inventory = yield models_1.Inventory.create(field);
                if (inventory === null) {
                    throw new Error(`Error creating inventory`);
                }
                return {
                    success: true,
                    data: inventory,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error.message} repository`,
                };
            }
        });
    }
    search_inventory_with_name(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inventorys = yield models_1.Inventory.findAll({
                    where: Object.assign({}, field),
                    attributes: ['product', 'quantity', 'department_id'],
                    include: [
                        {
                            model: models_1.Department,
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error.message} repository`,
                };
            }
        });
    }
    get_all_inventory_repo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inventorys = yield models_1.Inventory.findAll({
                    attributes: ['product', 'quantity', 'department_id'],
                    include: [
                        {
                            model: models_1.Department,
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error.message} repository`,
                };
            }
        });
    }
}
exports.default = InventoryRepository;
