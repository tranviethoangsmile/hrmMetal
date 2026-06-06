"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRouter_router_1 = __importDefault(require("../admin/adminRouter.router"));
const leader_router_1 = __importDefault(require("../leaderAndOther/leader.router"));
const dashboardsRouter = (0, express_1.Router)();
dashboardsRouter.use('/admin', adminRouter_router_1.default);
dashboardsRouter.use('/leader', leader_router_1.default);
exports.default = dashboardsRouter;
