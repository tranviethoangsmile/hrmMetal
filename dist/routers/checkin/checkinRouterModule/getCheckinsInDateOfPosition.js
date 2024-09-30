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
const getCheckinIndateOfPosition = (0, express_1.Router)();
getCheckinIndateOfPosition.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let field = req.body;
        if (field != null) {
            const result = yield (0, checkin_controller_1.get_checkin_in_date_of_position_controller)(field);
            if (result === null || result === void 0 ? void 0 : result.success) {
                return res.status(202).json({
                    success: true,
                    data: result === null || result === void 0 ? void 0 : result.data,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: result === null || result === void 0 ? void 0 : result.message,
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
exports.default = getCheckinIndateOfPosition;
