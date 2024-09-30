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
const canteen_controller_1 = require("../../controllers/canteen/canteen.controller");
const canteenRouter = (0, express_1.Router)();
canteenRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != undefined) {
            const canteen = yield (0, canteen_controller_1.create_canteen)(data);
            if (canteen === null || canteen === void 0 ? void 0 : canteen.success) {
                res.status(201).json({
                    success: true,
                    data: canteen === null || canteen === void 0 ? void 0 : canteen.data,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: canteen === null || canteen === void 0 ? void 0 : canteen.message,
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'data not empty',
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
canteenRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id != null) {
            const canteen = yield (0, canteen_controller_1.find_canteen_by_id)(id);
            if (canteen === null || canteen === void 0 ? void 0 : canteen.success) {
                res.status(201).json({
                    success: true,
                    data: canteen === null || canteen === void 0 ? void 0 : canteen.data,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: canteen === null || canteen === void 0 ? void 0 : canteen.message,
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
        res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
canteenRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const canteens = yield (0, canteen_controller_1.get_all_canteen)();
        if (canteens === null || canteens === void 0 ? void 0 : canteens.success) {
            res.status(201).json({
                success: true,
                data: canteens === null || canteens === void 0 ? void 0 : canteens.data,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: canteens === null || canteens === void 0 ? void 0 : canteens.message,
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
exports.default = canteenRouter;
