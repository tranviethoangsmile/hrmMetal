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
            throw new Error('data not empty');
        }
        const isValid = (0, dailyReport_validate_1.valid_search_daily_report)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            return res.status(400).json({
                success: false,
                message: `${(_a = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _a === void 0 ? void 0 : _a.message}`,
            });
        }
        if (field === null || field === void 0 ? void 0 : field.product) {
            if (typeof (field === null || field === void 0 ? void 0 : field.product) != 'string' ||
                !Object.values(product_enum_1.Products).includes(field === null || field === void 0 ? void 0 : field.product)) {
                return res.status(400).json({
                    success: false,
                    message: 'product not valid',
                });
            }
        }
        const dailyReports = yield (0, dailyReport_controler_1.find_all_report)(Object.assign({}, field));
        if (!(dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.success)) {
            return res.status(200).json({
                success: false,
                message: dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server Error router: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = getAllDailyReport;
