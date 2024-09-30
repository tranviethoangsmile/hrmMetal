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
const order_controller_1 = require("../../../controllers/order/order.controller");
const orderRouterModule = (0, express_1.Router)();
orderRouterModule.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body;
        if (id != null) {
            const orders = yield (0, order_controller_1.search_order_of_user)(id);
            if (orders === null || orders === void 0 ? void 0 : orders.success) {
                return res.status(202).send({
                    success: true,
                    data: orders === null || orders === void 0 ? void 0 : orders.data,
                });
            }
            else {
                return res.status(200).send({
                    success: false,
                    data: orders === null || orders === void 0 ? void 0 : orders.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
orderRouterModule.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_info = req.body;
        if (order_info !== null) {
            const result = yield (0, order_controller_1.check_picked_order)(order_info);
            if (result.success) {
                return res.status(202).send({
                    success: result === null || result === void 0 ? void 0 : result.success,
                });
            }
            else {
                return res.status(200).send({
                    success: result === null || result === void 0 ? void 0 : result.success,
                    message: result === null || result === void 0 ? void 0 : result.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'order info not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = orderRouterModule;
