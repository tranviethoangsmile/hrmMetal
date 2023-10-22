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
const paidLeaveRequest_controller_1 = require("../controllers/paidLeaveRequest.controller");
const veryRoleUpdate_middleware_1 = __importDefault(require("../middlewares/veryRoleUpdate.middleware"));
const paidLeaveRouter = (0, express_1.Router)();
paidLeaveRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != null) {
            const paidLeave = yield (0, paidLeaveRequest_controller_1.create)(data);
            if (paidLeave.success) {
                res.status(201).json({
                    success: paidLeave === null || paidLeave === void 0 ? void 0 : paidLeave.success,
                    data: paidLeave === null || paidLeave === void 0 ? void 0 : paidLeave.data,
                });
            }
            else {
                res.status(200).json({
                    success: paidLeave === null || paidLeave === void 0 ? void 0 : paidLeave.success,
                    message: paidLeave === null || paidLeave === void 0 ? void 0 : paidLeave.message,
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Bad Request - data not empty',
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
paidLeaveRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paid_leaves = yield (0, paidLeaveRequest_controller_1.get_all)();
        if (paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.success) {
            res.status(201).json({
                success: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.success,
                data: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.data,
            });
        }
        else {
            res.status(200).json({
                success: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.success,
                message: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.message,
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
paidLeaveRouter.put('/', veryRoleUpdate_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != null) {
            const paid_leave = yield (0, paidLeaveRequest_controller_1.update_is_active)(data);
            if (paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.success) {
                res.status(201).json({
                    success: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.success,
                    data: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.data,
                });
            }
            else {
                res.status(200).json({
                    success: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.success,
                    message: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.message,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = paidLeaveRouter;
