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
exports.search_product = exports.create_product = void 0;
const models_1 = require("../../models");
const create_product = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({
            where: {
                id: data.user_id,
            },
        });
        if (user != null) {
            const product = yield models_1.Product.create(Object.assign({}, data));
            if (product != null) {
                return {
                    success: true,
                    data: product,
                };
            }
            else {
                return {
                    success: false,
                    message: 'create product failed',
                };
            }
        }
        else {
            return {
                success: false,
                message: 'create product failed, user not exist',
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
exports.create_product = create_product;
const search_product = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield models_1.Product.findAll({
            where: Object.assign({}, data),
            attributes: [
                'name',
                'ic_card',
                'shift',
                'date',
                'quantity',
                'day_code',
            ],
            include: [
                {
                    model: models_1.User,
                    attributes: ['name'],
                    include: [
                        {
                            model: models_1.Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if (products != null) {
            return {
                success: true,
                data: products,
            };
        }
        else {
            return {
                success: false,
                message: 'product not found',
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
exports.search_product = search_product;
