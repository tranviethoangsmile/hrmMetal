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
exports.product_search = exports.product_create = void 0;
const product_repository_1 = require("../../repositorys/product/product.repository");
const product_validate_1 = require("../../validates/product/product.validate");
const enum_1 = require("../../enum");
const product_create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, product_validate_1.valid_create_product)(data);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        if (typeof data.name === 'string' &&
            !Object.values(enum_1.Products).includes(data.name)) {
            throw new Error(`product name not avaliable`);
        }
        const product = yield (0, product_repository_1.create_product)(data);
        if (!(product === null || product === void 0 ? void 0 : product.success)) {
            throw new Error(`${product === null || product === void 0 ? void 0 : product.message}`);
        }
        return {
            success: true,
            data: product === null || product === void 0 ? void 0 : product.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.product_create = product_create;
const product_search = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, product_validate_1.valid_search_product)(data);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const products = yield (0, product_repository_1.search_product)(data);
        if (!(products === null || products === void 0 ? void 0 : products.success)) {
            throw new Error(`${products === null || products === void 0 ? void 0 : products.message}`);
        }
        return {
            success: true,
            data: products === null || products === void 0 ? void 0 : products.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.product_search = product_search;
