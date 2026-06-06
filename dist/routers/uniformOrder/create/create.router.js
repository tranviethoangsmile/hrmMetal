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
const controllers_1 = require("../../../controllers");
const helpers_1 = require("../../../helpers");
const createUniformOrderRouter = (0, express_1.Router)();
createUniformOrderRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        // Kiểm tra user_id và position
        if (typeof field.user_id !== 'string' ||
            typeof field.position !== 'string' ||
            typeof field.date !== 'string') {
            const missingFields = [
                !field.user_id && 'user_id',
                !field.position && 'position',
                !field.date && 'date',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        // Kiểm tra các trường trong items (mảng sản phẩm)
        if (!Array.isArray(field.items) || field.items.length < 1) {
            return (0, helpers_1.errorResponse)(res, 400, 'Items array is required and must not be empty');
        }
        // Kiểm tra từng sản phẩm trong mảng items
        for (const item of field.items) {
            if (typeof item.uniform_type !== 'string' ||
                typeof item.uniform_size !== 'string') {
                return (0, helpers_1.errorResponse)(res, 400, 'Invalid uniform_type or uniform_size');
            }
            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                return (0, helpers_1.errorResponse)(res, 400, 'Quantity must be a positive number and > 0');
            }
        }
        const uniform = yield (0, controllers_1.create_uniform_order_controller)(field);
        if (!(uniform === null || uniform === void 0 ? void 0 : uniform.success)) {
            return (0, helpers_1.errorResponse)(res, 400, uniform.message || 'Failed to create uniform order');
        }
        return (0, helpers_1.successResponse)(res, 201, uniform === null || uniform === void 0 ? void 0 : uniform.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createUniformOrderRouter;
