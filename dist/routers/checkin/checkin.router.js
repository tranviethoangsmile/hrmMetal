"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createCheckin_router_1 = __importDefault(require("./checkinRouterModule/createCheckin.router"));
const searchCheckedOfUserInMonth_1 = __importDefault(require("./checkinRouterModule/searchCheckedOfUserInMonth"));
const getCheckinsInDateOfPosition_1 = __importDefault(require("./checkinRouterModule/getCheckinsInDateOfPosition"));
const getCheckinInDataOfUser_1 = __importDefault(require("./checkinRouterModule/getCheckinInDataOfUser"));
const checkinRouter = (0, express_1.Router)();
checkinRouter.use('/create', createCheckin_router_1.default);
checkinRouter.use('/search', searchCheckedOfUserInMonth_1.default);
checkinRouter.use('/getcheckinindateofposition', getCheckinsInDateOfPosition_1.default);
checkinRouter.use('/getcheckindetailindateofuser', getCheckinInDataOfUser_1.default);
exports.default = checkinRouter;
