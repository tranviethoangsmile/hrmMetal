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
const dailyReport_controler_1 = require("../controllers/dailyReport.controler");
const dailyReport_router_1 = __importDefault(require("./moduleReportRouter/dailyReport.router"));
const rpRouter = (0, express_1.Router)();
rpRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != null) {
            const created_rp = yield (0, dailyReport_controler_1.daily_report_create)(data);
            console.log(created_rp);
            if (created_rp === null || created_rp === void 0 ? void 0 : created_rp.success) {
                res.status(201).send({
                    success: true,
                    data: created_rp,
                });
            }
            else {
                res.status(200).end({
                    success: false,
                    message: created_rp === null || created_rp === void 0 ? void 0 : created_rp.message,
                });
            }
        }
        else {
            res.status(400).end({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
rpRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield (0, dailyReport_controler_1.find_all_report)();
        if (reports === null || reports === void 0 ? void 0 : reports.success) {
            res.status(201).send({
                success: true,
                data: reports === null || reports === void 0 ? void 0 : reports.data,
            });
        }
        else {
            res.status(200).send({
                success: false,
                message: reports === null || reports === void 0 ? void 0 : reports.message,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
rpRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id != null) {
            const report = yield (0, dailyReport_controler_1.find_report_by_id)(id);
            if (report === null || report === void 0 ? void 0 : report.success) {
                res.status(201).send({
                    success: true,
                    data: report === null || report === void 0 ? void 0 : report.data,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    message: 'report not found',
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'id not empty',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
rpRouter.use('/search', dailyReport_router_1.default);
exports.default = rpRouter;
