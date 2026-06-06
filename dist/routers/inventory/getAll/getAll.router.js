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
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const utils_1 = require("../../../utils");
const helpers_1 = require("../../../helpers");
const getAllRouter = (0, express_1.Router)();
getAllRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const KEY_CACHE = `all_inventory`;
        const inventory_value = yield (0, utils_1.getCache)(KEY_CACHE);
        if (inventory_value) {
            return (0, helpers_1.successResponse)(res, 200, JSON.parse(inventory_value));
        }
        const inventorys = yield (0, controllers_1.get_all_inventory_controller)();
        if (inventorys === null || inventorys === void 0 ? void 0 : inventorys.success) {
            yield (0, utils_1.setCache)(KEY_CACHE, JSON.stringify(inventorys === null || inventorys === void 0 ? void 0 : inventorys.data), 86400);
            return (0, helpers_1.successResponse)(res, 200, inventorys === null || inventorys === void 0 ? void 0 : inventorys.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, (inventorys === null || inventorys === void 0 ? void 0 : inventorys.message) || 'Failed to get inventory');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = getAllRouter;
