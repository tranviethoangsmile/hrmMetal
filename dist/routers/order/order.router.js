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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const order_router_1 = __importDefault(require("./moduleOrderRouter/order.router"));
const searchOrderWithField_router_1 = __importDefault(require("./moduleOrderRouter/searchOrderWithField.router"));
const helpers_1 = require("../../helpers");
const orderRouter = (0, express_1.Router)();
orderRouter.post('/', middlewares_1.very_token_order, middlewares_1.timeOrderLimit, middlewares_1.addPosition, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_data = req.body;
        if (!order_data.date || !order_data.dayOrNight || !order_data.user_id || !order_data.position) {
            const missingFields = [
                !order_data.date && 'date',
                !order_data.dayOrNight && 'dayOrNight',
                !order_data.user_id && 'user_id',
                !order_data.position && 'position',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing required ${missingFields}`);
        }
        const new_order = yield (0, controllers_1.create_order_controller)(order_data);
        if (!(new_order === null || new_order === void 0 ? void 0 : new_order.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (new_order === null || new_order === void 0 ? void 0 : new_order.message) || 'Failed to create order');
        }
        return (0, helpers_1.successResponse)(res, 201, new_order === null || new_order === void 0 ? void 0 : new_order.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
orderRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, controllers_1.find_all_order)();
        if (orders === null || orders === void 0 ? void 0 : orders.success) {
            return (0, helpers_1.successResponse)(res, 200, orders === null || orders === void 0 ? void 0 : orders.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, (orders === null || orders === void 0 ? void 0 : orders.message) || 'Failed to get orders');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
orderRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.id;
        if (!order_id) {
            return (0, helpers_1.errorResponse)(res, 400, 'id is required');
        }
        const order = yield (0, controllers_1.delete_order)(order_id);
        if (order.success) {
            return (0, helpers_1.successResponse)(res, 200, undefined, (order === null || order === void 0 ? void 0 : order.message) || 'Order deleted successfully');
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, (order === null || order === void 0 ? void 0 : order.message) || 'Failed to delete order');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
orderRouter.use('/user', order_router_1.default);
orderRouter.use('/searchorderwithfield', searchOrderWithField_router_1.default);
exports.default = orderRouter;
