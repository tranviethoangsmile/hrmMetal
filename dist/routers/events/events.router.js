"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_router_1 = __importDefault(require("./create/create.router"));
const delete_router_1 = __importDefault(require("./delete/delete.router"));
const update_router_1 = __importDefault(require("./update/update.router"));
const searchEvenById_router_1 = __importDefault(require("./searchById/searchEvenById.router"));
const getAllEvents_router_1 = __importDefault(require("./getAll/getAllEvents.router"));
const eventsRouter = (0, express_1.Router)();
eventsRouter.use('/create', create_router_1.default);
eventsRouter.use('/delete', delete_router_1.default);
eventsRouter.use('/update', update_router_1.default);
eventsRouter.use('/searchbyid', searchEvenById_router_1.default);
eventsRouter.use('/getall', getAllEvents_router_1.default);
exports.default = eventsRouter;
