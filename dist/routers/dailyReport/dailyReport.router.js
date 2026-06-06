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
const dailyReport_controler_1 = require("../../controllers/dailyReport/dailyReport.controler");
const dailyReport_router_1 = __importDefault(require("./moduleReportRouter/dailyReport.router"));
const create_1 = __importDefault(require("./create/create"));
const getAllDailyReport_router_1 = __importDefault(require("./getAllDailyReport/getAllDailyReport.router"));
const helpers_1 = require("../../helpers");
const rpRouter = (0, express_1.Router)();
rpRouter.use('/create', create_1.default);
rpRouter.use('/getall', getAllDailyReport_router_1.default);
rpRouter.use('/search', dailyReport_router_1.default);
rpRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != null) {
            const created_rp = yield (0, dailyReport_controler_1.daily_report_create)(data);
            if (created_rp === null || created_rp === void 0 ? void 0 : created_rp.success) {
                return (0, helpers_1.successResponse)(res, 201, created_rp === null || created_rp === void 0 ? void 0 : created_rp.data);
            }
            else {
                return (0, helpers_1.errorResponse)(res, 400, (created_rp === null || created_rp === void 0 ? void 0 : created_rp.message) || 'Failed to create daily report');
            }
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, 'data is required');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
rpRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id != null) {
            const report = yield (0, dailyReport_controler_1.find_report_by_id)(id);
            if (report === null || report === void 0 ? void 0 : report.success) {
                return (0, helpers_1.successResponse)(res, 200, report === null || report === void 0 ? void 0 : report.data);
            }
            else {
                return (0, helpers_1.errorResponse)(res, 404, 'report not found');
            }
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, 'id is required');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = rpRouter;
