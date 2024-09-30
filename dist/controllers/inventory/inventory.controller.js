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
exports.update_inventory_controller = exports.get_all_inventory_controller = exports.search_inventory_with_name_controller = exports.create = void 0;
const inventory_useCase_1 = require("../../useCases/inventory/inventory.useCase");
const create = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, inventory_useCase_1.create_inventory_use)(field);
});
exports.create = create;
const search_inventory_with_name_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, inventory_useCase_1.search_inventory_with_name_use)(field);
});
exports.search_inventory_with_name_controller = search_inventory_with_name_controller;
const get_all_inventory_controller = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, inventory_useCase_1.get_all_inventory_use)();
});
exports.get_all_inventory_controller = get_all_inventory_controller;
const update_inventory_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, inventory_useCase_1.update_inventory_use)(field);
});
exports.update_inventory_controller = update_inventory_controller;
