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
const dailyReport_validate_1 = require("../../../validates/dailyReport/dailyReport.validate");
const product_enum_1 = require("../../../enum/product.enum");
const helpers_1 = require("../../../helpers");
const helpers_2 = require("../../../helpers");
const getAllDailyReport = (0, express_1.Router)();
getAllDailyReport.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const field = req.body;
        if (!(field === null || field === void 0 ? void 0 : field.date) &&
            !(field === null || field === void 0 ? void 0 : field.department_id) &&
            !(field === null || field === void 0 ? void 0 : field.product) &&
            !(field === null || field === void 0 ? void 0 : field.shift) &&
            !(field === null || field === void 0 ? void 0 : field.user_id)) {
            return (0, helpers_1.errorResponse)(res, 400, 'At least one search field is required');
        }
        const isValid = (0, dailyReport_validate_1.valid_search_daily_report)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            return (0, helpers_1.errorResponse)(res, 400, ((_a = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _a === void 0 ? void 0 : _a.message) || 'Validation failed');
        }
        if (field === null || field === void 0 ? void 0 : field.product) {
            if ((0, helpers_2.isValidEnumValue)(field.product, product_enum_1.Products)) {
                return (0, helpers_1.errorResponse)(res, 400, 'product not valid');
            }
        }
        const dailyReports = yield (0, dailyReport_controler_1.find_all_report)(Object.assign({}, field));
        if (!(dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.message) || 'Failed to get daily reports');
        }
        return (0, helpers_1.successResponse)(res, 200, dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = getAllDailyReport;
