"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createEvenCheck_router_1 = __importDefault(require("./create/createEvenCheck.router"));
const searchEventChecked_router_1 = __importDefault(require("./search/searchEventChecked.router"));
const evenCheckRouter = (0, express_1.Router)();
evenCheckRouter.use('/create', createEvenCheck_router_1.default);
evenCheckRouter.use('/searcheventchecked', searchEventChecked_router_1.default);
exports.default = evenCheckRouter;
