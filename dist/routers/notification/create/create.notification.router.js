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
const createNotificationRouter = (0, express_1.Router)();
createNotificationRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field ||
            !field.message ||
            !field.title ||
            !field.type ||
            !field.user_id) {
            return res
                .status(400)
                .json({ success: false, message: 'Missing required fields' });
        }
        const notification = yield (0, controllers_1.create_notification_controller)(field);
        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
            return res.status(200).json({
                success: false,
                message: notification === null || notification === void 0 ? void 0 : notification.message,
            });
        }
        return res.status(201).json({
            success: true,
            data: notification === null || notification === void 0 ? void 0 : notification.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = createNotificationRouter;
