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
const inventory_controller_1 = require("../../../controllers/inventory/inventory.controller");
const helpers_1 = require("../../../helpers");
const updateRouter = (0, express_1.Router)();
updateRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field || !field.product || !field.quantity) {
            return (0, helpers_1.errorResponse)(res, 400, 'product and quantity are required');
        }
        else {
            const result = yield (0, inventory_controller_1.update_inventory_controller)(field);
            if (result === null || result === void 0 ? void 0 : result.success) {
                return (0, helpers_1.successResponse)(res, 200, undefined, 'Inventory updated successfully');
            }
            else {
                return (0, helpers_1.errorResponse)(res, 400, (result === null || result === void 0 ? void 0 : result.message) || 'Failed to update inventory');
            }
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = updateRouter;
