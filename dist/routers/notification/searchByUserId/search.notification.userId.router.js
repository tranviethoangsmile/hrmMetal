"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const utils_1 = require("../../../utils");
const helpers_1 = require("../../../helpers");
const searchNotificationByUserIdRouter = (0, express_1.Router)();
searchNotificationByUserIdRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.user_id;
        if (!id) {
            return (0, helpers_1.errorResponse)(res, 400, 'user_id is required');
        }
        const KEY_CACHE = `notification_user_${id}`;
        const notification_value_of_user = yield (0, utils_1.getCache)(KEY_CACHE);
        if (notification_value_of_user) {
            return (0, helpers_1.successResponse)(res, 202, JSON.parse(notification_value_of_user));
        }
        const notifications = yield (0, controllers_1.search_notification_of_user_controller)(id);
        if (!(notifications === null || notifications === void 0 ? void 0 : notifications.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (notifications === null || notifications === void 0 ? void 0 : notifications.message) || 'Failed to get notifications');
        }
        yield (0, utils_1.setCache)(KEY_CACHE, JSON.stringify(notifications === null || notifications === void 0 ? void 0 : notifications.data), 86400);
        return (0, helpers_1.successResponse)(res, 202, notifications === null || notifications === void 0 ? void 0 : notifications.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = searchNotificationByUserIdRouter;
