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
const order_controller_1 = require("../../controllers/order.controller");
const orderRouterModule = (0, express_1.Router)();
orderRouterModule.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body;
        if (id != null) {
            const orders = yield (0, order_controller_1.search_order_of_user)(id);
            if (orders === null || orders === void 0 ? void 0 : orders.success) {
                res.status(201).send({
                    success: true,
                    data: orders === null || orders === void 0 ? void 0 : orders.data,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    data: orders === null || orders === void 0 ? void 0 : orders.message,
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = orderRouterModule;
