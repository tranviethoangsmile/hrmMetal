"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const handleApproveRouter_router_1 = __importDefault(require("./paidLeave/handleApproveRouter.router"));
const GetPaidLeaveRequestRouter_router_1 = __importDefault(require("./paidLeave/GetPaidLeaveRequestRouter.router"));
const leaderRouter = (0, express_1.Router)();
leaderRouter.use(middlewares_1.authJwt);
leaderRouter.use((0, middlewares_1.requireRoles)(['LEADER', 'SUPERVISOR', 'MANAGER']));
leaderRouter.use('/aprove-paid-leave-request', handleApproveRouter_router_1.default);
leaderRouter.use('/get-paid-leave-request', GetPaidLeaveRequestRouter_router_1.default);
exports.default = leaderRouter;
