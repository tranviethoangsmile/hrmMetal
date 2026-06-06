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
const GetPaidLeaveRequestForLeaderAndOtherRouter = (0, express_1.Router)();
GetPaidLeaveRequestForLeaderAndOtherRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const leader_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!leader_id) {
            return (0, helpers_1.errorResponse)(res, 400, 'Leader id is required');
        }
        const paid_leaves = yield (0, controllers_1.get_all_paid_leave_controller)(leader_id);
        if (!(paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.success)) {
            return (0, helpers_1.errorResponse)(res, 200, paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.message);
        }
        return (0, helpers_1.successResponse)(res, 202, paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = GetPaidLeaveRequestForLeaderAndOtherRouter;
