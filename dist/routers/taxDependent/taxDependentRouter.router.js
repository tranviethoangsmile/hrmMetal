"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_router_1 = __importDefault(require("./create/create.router"));
const deleteTaxDependentRouter_router_1 = __importDefault(require("./delete/deleteTaxDependentRouter.router"));
const updateTaxDependentRouter_router_1 = __importDefault(require("./update/updateTaxDependentRouter.router"));
const getAllTaxDependentByUserId_router_1 = __importDefault(require("./getAllByUserId/getAllTaxDependentByUserId.router"));
const updateStatusRouter_router_1 = __importDefault(require("./updateStatus/updateStatusRouter.router"));
const taxDependentMainRouter = (0, express_1.Router)();
taxDependentMainRouter.use('/create', create_router_1.default);
taxDependentMainRouter.use('/delete', deleteTaxDependentRouter_router_1.default);
taxDependentMainRouter.use('/update', updateTaxDependentRouter_router_1.default);
taxDependentMainRouter.use('/getbyuserid', getAllTaxDependentByUserId_router_1.default);
taxDependentMainRouter.use('/update-status', updateStatusRouter_router_1.default);
exports.default = taxDependentMainRouter;
