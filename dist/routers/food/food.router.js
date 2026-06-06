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
const food_controller_1 = require("../../controllers/food/food.controller");
const helpers_1 = require("../../helpers");
const foodRouter = (0, express_1.Router)();
foodRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != null) {
            const food = yield (0, food_controller_1.create)(data);
            if (food === null || food === void 0 ? void 0 : food.success) {
                return (0, helpers_1.successResponse)(res, 201, food === null || food === void 0 ? void 0 : food.data);
            }
            else {
                return (0, helpers_1.errorResponse)(res, 400, (food === null || food === void 0 ? void 0 : food.message) || 'Failed to create food');
            }
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, 'Data is required');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
foodRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id != null) {
            const food = yield (0, food_controller_1.find)(id);
            if (food === null || food === void 0 ? void 0 : food.success) {
                return (0, helpers_1.successResponse)(res, 200, food === null || food === void 0 ? void 0 : food.data);
            }
            else {
                return (0, helpers_1.errorResponse)(res, 404, (food === null || food === void 0 ? void 0 : food.message) || 'Food not found');
            }
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, 'ID is required');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
foodRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield (0, food_controller_1.find_all)();
        if (foods === null || foods === void 0 ? void 0 : foods.success) {
            return (0, helpers_1.successResponse)(res, 200, foods === null || foods === void 0 ? void 0 : foods.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, (foods === null || foods === void 0 ? void 0 : foods.message) || 'Failed to get foods');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = foodRouter;
