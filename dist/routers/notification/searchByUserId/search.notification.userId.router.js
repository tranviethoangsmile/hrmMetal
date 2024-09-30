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
const searchNotificationByUserIdRouter = (0, express_1.Router)();
searchNotificationByUserIdRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.user_id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'id is required' });
        }
        const notifications = yield (0, controllers_1.search_notification_of_user_controller)(id);
        if (!(notifications === null || notifications === void 0 ? void 0 : notifications.success)) {
            return res.status(200).json({
                success: false,
                message: notifications.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: notifications === null || notifications === void 0 ? void 0 : notifications.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
}));
exports.default = searchNotificationByUserIdRouter;
