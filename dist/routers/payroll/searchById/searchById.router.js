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
const payroll_controller_1 = require("../../../controllers/payroll/payroll.controller");
const searchPayrollByIdRouter = (0, express_1.Router)();
searchPayrollByIdRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        if (id === undefined) {
            return res
                .status(400)
                .json({ success: false, message: 'id is required' });
        }
        const payroll = yield (0, payroll_controller_1.search_payroll_by_id_controller)(id);
        if (!(payroll === null || payroll === void 0 ? void 0 : payroll.success)) {
            return res.status(200).json({
                success: false,
                message: payroll === null || payroll === void 0 ? void 0 : payroll.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: payroll === null || payroll === void 0 ? void 0 : payroll.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = searchPayrollByIdRouter;
