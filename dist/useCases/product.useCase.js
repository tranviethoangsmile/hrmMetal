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
const product_repository_1 = require("../repositorys/product.repository");
const product_validate_1 = require("../validates/product.validate");
const product_enum_1 = require("../enum/product.enum");
const product_create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, product_validate_1.valid_create_product)(data);
        if (!valid.error) {
            if (typeof data.name === 'string' &&
                Object.values(product_enum_1.Products).includes(data.name)) {
                const product = yield (0, product_repository_1.create_product)(data);
                if (product === null || product === void 0 ? void 0 : product.success) {
                    return {
                        success: true,
                        data: product === null || product === void 0 ? void 0 : product.data,
                    };
                }
                else {
                    return {
                        success: false,
                        message: product === null || product === void 0 ? void 0 : product.message,
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'product name not avaliable',
                };
            }
        }
        else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
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
        const valid = yield (0, product_validate_1.valid_search_product)(data);
        if (!valid.error) {
            const products = yield (0, product_repository_1.search_product)(data);
            if (products === null || products === void 0 ? void 0 : products.success) {
                return {
                    success: true,
                    data: products === null || products === void 0 ? void 0 : products.data,
                };
            }
            else {
                return {
                    success: false,
                    message: products === null || products === void 0 ? void 0 : products.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.product_search = product_search;
