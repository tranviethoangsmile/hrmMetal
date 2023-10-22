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
const user_controller_1 = require("../controllers/user.controller");
const order_controller_1 = require("../controllers/order.controller");
const findRouter = (0, express_1.Router)();
findRouter.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        if (name) {
            const data = yield (0, user_controller_1.findByName)(name);
            if (!(data === null || data === void 0 ? void 0 : data.success)) {
                res.status(201).send({
                    success: true,
                    data: data === null || data === void 0 ? void 0 : data.data,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    message: data === null || data === void 0 ? void 0 : data.message,
                });
            }
        }
    }
    catch (error) {
        return {
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        };
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
                res.status(201).send({
                    success: true,
                    data: orders === null || orders === void 0 ? void 0 : orders.data,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    message: orders === null || orders === void 0 ? void 0 : orders.message,
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'value not empty',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = findRouter;
