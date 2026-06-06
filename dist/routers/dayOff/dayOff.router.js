"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const createDayOff_router_1 = __importDefault(require("./create/createDayOff.router"));
const getAll_router_1 = __importDefault(require("./getAll/getAll.router"));
const getById_router_1 = __importDefault(require("./getById/getById.router"));
const deleteById_router_1 = __importDefault(require("./deleteById/deleteById.router"));
const update_router_1 = __importDefault(require("./update/update.router"));
const dayOffRouter = (0, express_1.Router)();
dayOffRouter.use('/create', middlewares_1.authAdminRole, createDayOff_router_1.default);
dayOffRouter.use('/getall', getAll_router_1.default);
dayOffRouter.use('/getbyid', getById_router_1.default);
dayOffRouter.use('/deletebyid', middlewares_1.authAdminRole, deleteById_router_1.default);
dayOffRouter.use('/update', middlewares_1.authAdminRole, update_router_1.default);
exports.default = dayOffRouter;
