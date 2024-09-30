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
const inventory_controller_1 = require("../../../controllers/inventory/inventory.controller");
const updateRouter = (0, express_1.Router)();
updateRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field || !field.product || !field.quantity) {
            return res.status(400).json({
                success: false,
                message: 'Bad request',
            });
        }
        else {
            const result = yield (0, inventory_controller_1.update_inventory_controller)(field);
            if (result === null || result === void 0 ? void 0 : result.success) {
                return res.status(202).json({
                    success: true,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: result === null || result === void 0 ? void 0 : result.message,
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message} server error`,
        });
    }
}));
exports.default = updateRouter;
