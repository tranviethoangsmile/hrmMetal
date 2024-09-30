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
const search_order_router = (0, express_1.Router)();
const order_controller_1 = require("../../../controllers/order/order.controller");
search_order_router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (field != null) {
            const order_list = yield (0, order_controller_1.search_orders)(Object.assign({}, field));
            if (order_list.success) {
                return res.status(202).json({
                    success: true,
                    data: order_list === null || order_list === void 0 ? void 0 : order_list.data,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: order_list === null || order_list === void 0 ? void 0 : order_list.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Missing parameters data not empty',
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
exports.default = search_order_router;
