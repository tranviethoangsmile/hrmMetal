"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_router_1 = __importDefault(require("./create/create.router"));
const update_router_1 = __importDefault(require("./update/update.router"));
const searchById_router_1 = __importDefault(require("./search/searchById.router"));
const destroy_router_1 = __importDefault(require("./destroy/destroy.router"));
const searchByDateAndDepartment_router_1 = __importDefault(require("./searchByDateAndDepartment/searchByDateAndDepartment.router"));
const planProductionRouter = (0, express_1.Router)();
planProductionRouter.use('/create', create_router_1.default);
planProductionRouter.use('/update', update_router_1.default);
planProductionRouter.use('/searchbyid', searchById_router_1.default);
planProductionRouter.use('/destroy', destroy_router_1.default);
planProductionRouter.use('/searchbydateanddepartment', searchByDateAndDepartment_router_1.default);
exports.default = planProductionRouter;
