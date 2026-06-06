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
const updateIsConfirmOvertimeRequestRouter = (0, express_1.Router)();
updateIsConfirmOvertimeRequestRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data || !data.user_id || !data.id) {
            const missingFields = [
                !(data === null || data === void 0 ? void 0 : data.user_id) && 'user_id',
                !(data === null || data === void 0 ? void 0 : data.id) && 'id',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing values: ${missingFields}`);
        }
        const response = yield (0, controllers_1.update_isConfirm_ovetime_request_controller)(data);
        if (!response.success) {
            return (0, helpers_1.errorResponse)(res, 200, response.message || 'Failed to update overtime request');
        }
        return (0, helpers_1.successResponse)(res, 202, undefined, 'Overtime request updated successfully');
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = updateIsConfirmOvertimeRequestRouter;
