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
const destroyPayrollRouter = (0, express_1.Router)();
destroyPayrollRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        if (typeof id !== 'string') {
            return res
                .status(400)
                .json({ success: false, message: 'id is not a string' });
        }
        const result = yield (0, payroll_controller_1.destroy_payroll_controller)(id);
        if (!result.success) {
            return res.status(200).json({
                success: false,
                message: result === null || result === void 0 ? void 0 : result.message,
            });
        }
        return res.status(202).json({ success: true });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error:  ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = destroyPayrollRouter;
