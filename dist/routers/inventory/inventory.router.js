"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = __importDefault(require("./create/create"));
const search_router_1 = __importDefault(require("./search/search.router"));
const getAll_router_1 = __importDefault(require("./getAll/getAll.router"));
const update_router_1 = __importDefault(require("./update/update.router"));
const inventoryRouter = (0, express_1.Router)();
inventoryRouter.use('/create', create_1.default);
inventoryRouter.use('/search', search_router_1.default);
inventoryRouter.use('/getall', getAll_router_1.default);
inventoryRouter.use('/update', update_router_1.default);
exports.default = inventoryRouter;
