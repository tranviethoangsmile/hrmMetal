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
const dailyReport_controler_1 = require("../../../controllers/dailyReport/dailyReport.controler");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const dailyRpRouter = (0, express_1.Router)();
dailyRpRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data != null) {
            if ((data === null || data === void 0 ? void 0 : data.date) != null) {
                const date = (0, moment_timezone_1.default)(data.date, 'YYYY/MM/DD');
                data.date = date.toISOString();
            }
            const reports = yield (0, dailyReport_controler_1.find_report)(data);
            if (reports === null || reports === void 0 ? void 0 : reports.success) {
                return res.status(202).send({
                    success: true,
                    data: reports === null || reports === void 0 ? void 0 : reports.data,
                });
            }
            else {
                return res.status(200).send({
                    success: false,
                    message: reports === null || reports === void 0 ? void 0 : reports.message,
                });
            }
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error:' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = dailyRpRouter;
