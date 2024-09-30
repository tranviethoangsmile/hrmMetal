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
const order_controller_1 = require("../../controllers/order/order.controller");
const timeOrderLimit_middleware_1 = require("../../middlewares/timeOrderLimit.middleware");
const veryTokenOrder_middleware_1 = require("../../middlewares/veryTokenOrder.middleware");
const order_router_1 = __importDefault(require("./moduleOrderRouter/order.router"));
const addPosition_middleware_1 = __importDefault(require("../../middlewares/addPosition.middleware"));
const searchOrderWithField_router_1 = __importDefault(require("./moduleOrderRouter/searchOrderWithField.router"));
const orderRouter = (0, express_1.Router)();
orderRouter.post('/', veryTokenOrder_middleware_1.very_token_order, timeOrderLimit_middleware_1.timeOrderLimit, addPosition_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_data = req.body;
        if (order_data && Object.keys(order_data).length !== 0) {
            const new_order = yield (0, order_controller_1.create)(order_data);
            if (new_order === null || new_order === void 0 ? void 0 : new_order.success) {
                return res.status(201).json({
                    success: true,
                    data: new_order === null || new_order === void 0 ? void 0 : new_order.data,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: new_order === null || new_order === void 0 ? void 0 : new_order.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
orderRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_controller_1.find_all_order)();
        if (orders === null || orders === void 0 ? void 0 : orders.success) {
            return res.status(202).json({
                success: true,
                data: orders === null || orders === void 0 ? void 0 : orders.data,
            });
        }
        else {
            return res.status(200).json({
                success: false,
                message: orders === null || orders === void 0 ? void 0 : orders.message,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
orderRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.id;
        if (!order_id) {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
        const order = yield (0, order_controller_1.delete_order)(order_id);
        if (order.success) {
            return res.status(202).json({
                success: true,
                message: order === null || order === void 0 ? void 0 : order.message,
            });
        }
        else {
            return res.status(200).json({
                success: false,
                message: order === null || order === void 0 ? void 0 : order.message,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
orderRouter.use('/user', order_router_1.default);
orderRouter.use('/searchorderwithfield', searchOrderWithField_router_1.default);
exports.default = orderRouter;
