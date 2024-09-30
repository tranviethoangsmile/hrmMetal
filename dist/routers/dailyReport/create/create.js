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
const dailyReport_controler_1 = require("../../../controllers/dailyReport/dailyReport.controler");
const createDailyReportRouter = (0, express_1.Router)();
createDailyReportRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field ||
            !field.date ||
            !field.operated_time ||
            !field.operator_history ||
            !field.product ||
            !field.shift ||
            !field.quantity ||
            !field.shutdown_time ||
            !field.user_id ||
            !field.department_id) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields, data not empty',
            });
        }
        else {
            const dailyReport = yield (0, dailyReport_controler_1.daily_report_create)(field);
            if (dailyReport === null || dailyReport === void 0 ? void 0 : dailyReport.success) {
                return res.status(201).json({
                    success: true,
                    data: dailyReport === null || dailyReport === void 0 ? void 0 : dailyReport.data,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: `${dailyReport === null || dailyReport === void 0 ? void 0 : dailyReport.message}`,
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message} server error`,
        });
    }
}));
exports.default = createDailyReportRouter;
