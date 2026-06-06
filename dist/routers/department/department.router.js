"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_router_1 = __importDefault(require("./create/create.router"));
const getall_router_1 = __importDefault(require("./getAll/getall.router"));
const getbyid_router_1 = __importDefault(require("./getById/getbyid.router"));
const depRouter = (0, express_1.Router)();
depRouter.use('/create', create_router_1.default);
depRouter.use('/getall', getall_router_1.default);
depRouter.use('/getbyid', getbyid_router_1.default);
exports.default = depRouter;
