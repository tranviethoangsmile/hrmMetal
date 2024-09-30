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
const product_controller_1 = require("../../controllers/product/product.controller");
const product_router_1 = __importDefault(require("./moduleProductRouter/product.router"));
const productRouter = (0, express_1.Router)();
productRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != undefined) {
            const product = yield (0, product_controller_1.create_product)(data);
            if (product === null || product === void 0 ? void 0 : product.success) {
                res.status(201).send({
                    success: true,
                    data: product === null || product === void 0 ? void 0 : product.data,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    message: product === null || product === void 0 ? void 0 : product.message,
                });
            }
        }
        else {
            res.status(200).send({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
productRouter.use('/search', product_router_1.default);
exports.default = productRouter;
