"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const findByDailyReportId_router_1 = __importDefault(require("./findByDailyreportId/findByDailyReportId.router"));
const errOfRpRouter = (0, express_1.Router)();
errOfRpRouter.use('/findByDailyReportId', findByDailyReportId_router_1.default);
exports.default = errOfRpRouter;
