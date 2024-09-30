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
const paidLeaveRequest_controller_1 = require("../../../controllers/paidLeaveRequest/paidLeaveRequest.controller");
const validates_1 = require("../../../validates");
const updateConfirmRouter = (0, express_1.Router)();
updateConfirmRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const field = req.body;
        const isValid = (0, validates_1.validate_update_paid)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error((_a = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _a === void 0 ? void 0 : _a.message);
        }
        if (!(field === null || field === void 0 ? void 0 : field.admin_id) && !(field === null || field === void 0 ? void 0 : field.user_id) && !(field === null || field === void 0 ? void 0 : field.id)) {
            throw new Error('missing value request');
        }
        const update_confirm = yield (0, paidLeaveRequest_controller_1.update_confirm_from_admin_paid_leave_request_controller)(field);
        if (!(update_confirm === null || update_confirm === void 0 ? void 0 : update_confirm.success)) {
            throw new Error(update_confirm === null || update_confirm === void 0 ? void 0 : update_confirm.message);
        }
        return res.status(202).json({
            success: true,
            message: update_confirm === null || update_confirm === void 0 ? void 0 : update_confirm.message,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `server error: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = updateConfirmRouter;
