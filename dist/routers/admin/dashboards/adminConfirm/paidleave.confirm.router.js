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
const controllers_1 = require("../../../../controllers");
const helpers_1 = require("../../../../helpers");
const isConfirmPaidLeaveFromAdmin = (0, express_1.Router)();
isConfirmPaidLeaveFromAdmin.post('/paid-leave-confirm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = Object.assign(Object.assign({}, req.body), { admin_id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!(data === null || data === void 0 ? void 0 : data.user_id) || !(data === null || data === void 0 ? void 0 : data.id) || !(data === null || data === void 0 ? void 0 : data.admin_id)) {
            const missingFields = [
                (!(data === null || data === void 0 ? void 0 : data.user_id) || (data === null || data === void 0 ? void 0 : data.user_id.trim()) === '') && "user_id",
                (!(data === null || data === void 0 ? void 0 : data.id) || (data === null || data === void 0 ? void 0 : data.id.trim()) === '') && "id",
                (!(data === null || data === void 0 ? void 0 : data.admin_id) || (data === null || data === void 0 ? void 0 : data.admin_id.trim()) === '') && "admin_id"
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `bad request missing: ${missingFields}`);
        }
        const result = yield (0, controllers_1.update_confirm_from_admin_paid_leave_request_controller)(data);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return (0, helpers_1.errorResponse)(res, 200, `update faild with message: ${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return (0, helpers_1.successResponse)(res, 202);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, `server error: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
}));
exports.default = isConfirmPaidLeaveFromAdmin;
