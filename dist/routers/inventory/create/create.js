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
const createRouter = (0, express_1.Router)();
createRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field ||
            !field.product ||
            !field.quantity ||
            !field.department_id) {
            const missingFields = [
                !field.product && 'product',
                !field.quantity && 'quantity',
                !field.department_id && 'department_id',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        else {
            const KEY_CACHE = `all_inventory`;
            const inventory = yield (0, controllers_1.create_inventory_controller)(field);
            if (inventory === null || inventory === void 0 ? void 0 : inventory.success) {
                yield (0, utils_1.delCache)(KEY_CACHE);
                return (0, helpers_1.successResponse)(res, 201, inventory === null || inventory === void 0 ? void 0 : inventory.data);
            }
            else {
                return (0, helpers_1.errorResponse)(res, 400, (inventory === null || inventory === void 0 ? void 0 : inventory.message) || 'Failed to create inventory');
            }
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createRouter;
