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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = __importDefault(require("./create/create"));
const searchPaidLeaveRequestWithField_router_1 = __importDefault(require("./search/searchPaidLeaveRequestWithField.router"));
const deletePaidLeave_router_1 = __importDefault(require("./delete/deletePaidLeave.router"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const helpers_1 = require("../../helpers");
const paidLeaveRouter = (0, express_1.Router)();
paidLeaveRouter.use('/create', create_1.default);
paidLeaveRouter.use('/search', searchPaidLeaveRequestWithField_router_1.default);
paidLeaveRouter.use('/delete', deletePaidLeave_router_1.default);
paidLeaveRouter.put('/', middlewares_1.very_role, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!(data === null || data === void 0 ? void 0 : data.id)) {
            return (0, helpers_1.errorResponse)(res, 400, `id is required`);
        }
        const paid_leave = yield (0, controllers_1.update_is_active_paid_leave_controller)(data);
        if (!(paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.message) || 'Failed to update paid leave');
        }
        return (0, helpers_1.successResponse)(res, 202);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = paidLeaveRouter;
