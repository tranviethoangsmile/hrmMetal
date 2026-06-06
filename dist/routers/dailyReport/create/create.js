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
const helpers_1 = require("../../../helpers");
const createDailyReportRouter = (0, express_1.Router)();
createDailyReportRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return (0, helpers_1.errorResponse)(res, 400, 'Request body is required');
        }
        const field = req.body;
        const missingFields = [
            (!field.product || field.product.trim() === '') && 'product',
            (!field.user_id || field.user_id.trim() === '') && 'user_id',
            (!field.department_id || field.department_id.trim() === '') &&
                'department_id',
            (!field.date || field.date.trim() === '') && 'date',
            (!field.shift || field.shift.trim() === '') && 'shift',
            (field.quantity === undefined || field.quantity === null) &&
                'quantity',
            (field.good_quantity === undefined || field.good_quantity === null) &&
                'good_quantity',
            (field.defective_quantity === undefined || field.defective_quantity === null) &&
                'defective_quantity',
            (field.cycle_time === undefined || field.cycle_time === null) &&
                'cycle_time',
            (field.operated_time === undefined || field.operated_time === null) &&
                'operated_time',
            (field.shutdown_time === undefined || field.shutdown_time === null) &&
                'shutdown_time',
            (!field.operator_history || field.operator_history.trim() === '') &&
                'operator_history',
        ].filter(Boolean);
        if (missingFields.length > 0) {
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields.join(', ')}`);
        }
        const dailyReport = yield (0, dailyReport_controler_1.daily_report_create)(field);
        console.log(dailyReport);
        if (dailyReport === null || dailyReport === void 0 ? void 0 : dailyReport.success) {
            return (0, helpers_1.successResponse)(res, 201, dailyReport === null || dailyReport === void 0 ? void 0 : dailyReport.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 200, (dailyReport === null || dailyReport === void 0 ? void 0 : dailyReport.message) || 'Failed to create daily report');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createDailyReportRouter;
