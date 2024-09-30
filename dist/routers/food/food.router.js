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
const foodRouter = (0, express_1.Router)();
foodRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != null) {
            const food = yield (0, food_controller_1.create)(data);
            if (food === null || food === void 0 ? void 0 : food.success) {
                res.status(201).json({
                    success: true,
                    data: food === null || food === void 0 ? void 0 : food.data,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: food === null || food === void 0 ? void 0 : food.message,
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
foodRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id != null) {
            const food = yield (0, food_controller_1.find)(id);
            if (food === null || food === void 0 ? void 0 : food.success) {
                res.status(201).json({
                    success: true,
                    data: food === null || food === void 0 ? void 0 : food.data,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: food === null || food === void 0 ? void 0 : food.message,
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
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
foodRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield (0, food_controller_1.find_all)();
        if (foods === null || foods === void 0 ? void 0 : foods.success) {
            res.status(201).json({
                success: true,
                data: foods === null || foods === void 0 ? void 0 : foods.data,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: foods === null || foods === void 0 ? void 0 : foods.message,
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
exports.default = foodRouter;
