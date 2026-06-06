"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_notification_router_1 = __importDefault(require("./create/create.notification.router"));
const update_notification_router_1 = __importDefault(require("./update/update.notification.router"));
const destroy_notification_router_1 = __importDefault(require("./destroy/destroy.notification.router"));
const search_notification_router_1 = __importDefault(require("./search/search.notification.router"));
const search_notification_userId_router_1 = __importDefault(require("./searchByUserId/search.notification.userId.router"));
const notificationRouter = (0, express_1.Router)();
notificationRouter.use('/create', create_notification_router_1.default);
notificationRouter.use('/update', update_notification_router_1.default);
notificationRouter.use('/destroy', destroy_notification_router_1.default);
notificationRouter.use('/search', search_notification_router_1.default);
notificationRouter.use('/searchById', search_notification_userId_router_1.default);
exports.default = notificationRouter;
