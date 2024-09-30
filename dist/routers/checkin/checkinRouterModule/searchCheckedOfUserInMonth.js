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
const checkin_controller_1 = require("../../../controllers/checkin/checkin.controller");
const checkinSearchRouter = (0, express_1.Router)();
checkinSearchRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (field != null) {
            const checked_value = yield (0, checkin_controller_1.search_checked_of_user_in_month_controller)(field);
            if (checked_value === null || checked_value === void 0 ? void 0 : checked_value.success) {
                return res.status(202).json({
                    success: true,
                    data: checked_value === null || checked_value === void 0 ? void 0 : checked_value.data,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: checked_value === null || checked_value === void 0 ? void 0 : checked_value.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = checkinSearchRouter;
