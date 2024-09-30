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
const product_controller_1 = require("../../../controllers/product/product.controller");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const productModuleRouter = (0, express_1.Router)();
productModuleRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if ((field === null || field === void 0 ? void 0 : field.date) != null) {
            const date = (0, moment_timezone_1.default)(field.date, 'YYYY/MM/DD');
            field.date = date.toISOString();
        }
        const products = yield (0, product_controller_1.search_product)(field);
        if (products === null || products === void 0 ? void 0 : products.success) {
            res.status(201).send({
                success: true,
                data: products === null || products === void 0 ? void 0 : products.data,
            });
        }
        else {
            res.status(201).send({
                success: false,
                message: products === null || products === void 0 ? void 0 : products.message,
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
exports.default = productModuleRouter;
