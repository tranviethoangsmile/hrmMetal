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
const unApproveRouter = (0, express_1.Router)();
unApproveRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (field != null) {
            const update = yield (0, paidLeaveRequest_controller_1.update_un_approve_leave_request_controller)(field);
            if (update === null || update === void 0 ? void 0 : update.success) {
                res.status(202).json({
                    success: true,
                    message: update === null || update === void 0 ? void 0 : update.message,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: update === null || update === void 0 ? void 0 : update.message,
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Missing data',
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
exports.default = unApproveRouter;
