"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_router_1 = __importDefault(require("./create/create.router"));
const searchSafetyChecked_router_1 = __importDefault(require("./searchSafetyChecked/searchSafetyChecked.router"));
const safetyCheckRouter = (0, express_1.Router)();
safetyCheckRouter.use('/create', create_router_1.default);
safetyCheckRouter.use('/searchsafetychecked', searchSafetyChecked_router_1.default);
exports.default = safetyCheckRouter;
