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
const user_controller_1 = require("../../controllers/user/user.controller");
const order_controller_1 = require("../../controllers/order/order.controller");
const helpers_1 = require("../../helpers");
const findRouter = (0, express_1.Router)();
findRouter.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        if (name) {
            const data = yield (0, user_controller_1.findByName)(name);
            if (data === null || data === void 0 ? void 0 : data.success) {
                return (0, helpers_1.successResponse)(res, 200, data === null || data === void 0 ? void 0 : data.data);
            }
            else {
                return (0, helpers_1.errorResponse)(res, 400, (data === null || data === void 0 ? void 0 : data.message) || 'Failed to find user');
            }
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, 'name is required');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
findRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = req.body;
        if (value != null) {
            if (value.created_at != null) {
                const new_value = new Date(Date.parse(value.created_at));
                value.created_at = new_value.toISOString();
            }
            const orders = yield (0, order_controller_1.search_orders)(value);
            if (orders === null || orders === void 0 ? void 0 : orders.success) {
                return (0, helpers_1.successResponse)(res, 200, orders === null || orders === void 0 ? void 0 : orders.data);
            }
            else {
                return (0, helpers_1.errorResponse)(res, 400, (orders === null || orders === void 0 ? void 0 : orders.message) || 'Failed to search orders');
            }
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, 'value is required');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = findRouter;
