"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createInformation_router_1 = __importDefault(require("./infomationRouterModule/createInformation.router"));
const getInformationOfuser_router_1 = __importDefault(require("./infomationRouterModule/getInformationOfuser.router"));
const getInformationById_router_1 = __importDefault(require("./infomationRouterModule/getInformationById.router"));
const getInformationByField_router_1 = __importDefault(require("./infomationRouterModule/getInformationByField.router"));
const deleteInformationById_router_1 = __importDefault(require("./infomationRouterModule/deleteInformationById.router"));
const informationRouter = (0, express_1.Router)();
informationRouter.use('/create', createInformation_router_1.default);
informationRouter.use('/getinforofuser', getInformationOfuser_router_1.default);
informationRouter.use('/getinforbyid', getInformationById_router_1.default);
informationRouter.use('/getallinforbyfield', getInformationByField_router_1.default);
informationRouter.use('/deleteinformationbyid', deleteInformationById_router_1.default);
exports.default = informationRouter;
