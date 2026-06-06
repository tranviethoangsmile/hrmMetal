"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = __importDefault(require("./create/create"));
const update_1 = __importDefault(require("./update/update"));
const search_1 = __importDefault(require("./search/search"));
const searchById_router_1 = __importDefault(require("./searchById/searchById.router"));
const destoy_1 = __importDefault(require("./destroy/destoy"));
const payrollRouter = (0, express_1.Router)();
payrollRouter.use('/create', create_1.default);
payrollRouter.use('/update', update_1.default);
payrollRouter.use('/search', search_1.default);
payrollRouter.use('/searchbyid', searchById_router_1.default);
payrollRouter.use('/destroy', destoy_1.default);
exports.default = payrollRouter;
