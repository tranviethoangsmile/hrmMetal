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
const helpers_1 = require("../../../helpers");
const controllers_1 = require("../../../controllers");
const handleApprovePaidLeaveRequestRouter = (0, express_1.Router)();
handleApprovePaidLeaveRequestRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payload = Object.assign(Object.assign({}, req.body), { leader_id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!(payload === null || payload === void 0 ? void 0 : payload.id) ||
            typeof (payload === null || payload === void 0 ? void 0 : payload.is_approve) !== 'boolean' ||
            !(payload === null || payload === void 0 ? void 0 : payload.leader_id)) {
            const missingFields = [
                (!(payload === null || payload === void 0 ? void 0 : payload.id) || (payload === null || payload === void 0 ? void 0 : payload.id.trim()) === '') && 'id',
                (!(payload === null || payload === void 0 ? void 0 : payload.leader_id) || (payload === null || payload === void 0 ? void 0 : payload.leader_id.trim()) === '') && 'leader_id',
                typeof (payload === null || payload === void 0 ? void 0 : payload.is_approve) !== 'boolean' && 'is_approve'
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `bad request with missing field: ${missingFields}`);
        }
        const update_result = yield (0, controllers_1.update_approve_leave_request_controller)(payload);
        if (!(update_result === null || update_result === void 0 ? void 0 : update_result.success)) {
            return (0, helpers_1.errorResponse)(res, 200, `${update_result === null || update_result === void 0 ? void 0 : update_result.message}`);
        }
        return (0, helpers_1.successResponse)(res, 202);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, `server error: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
}));
exports.default = handleApprovePaidLeaveRequestRouter;
