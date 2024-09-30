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
const searchLeaveRouter = (0, express_1.Router)();
searchLeaveRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (field != undefined && typeof field === 'object') {
            const leaves = yield (0, paidLeaveRequest_controller_1.search_leave_request_with_field_controller)(field);
            if (leaves === null || leaves === void 0 ? void 0 : leaves.success) {
                res.status(202).json({
                    success: true,
                    data: leaves === null || leaves === void 0 ? void 0 : leaves.data,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: leaves === null || leaves === void 0 ? void 0 : leaves.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Data do not empty',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Sever Error ' + error.message,
        });
    }
}));
exports.default = searchLeaveRouter;
