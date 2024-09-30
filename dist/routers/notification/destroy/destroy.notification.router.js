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
const destroyNotificationRouter = (0, express_1.Router)();
destroyNotificationRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad request' });
        }
        const result = yield (0, controllers_1.destroy_notification_controller)(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return res
                .status(200)
                .json({ success: false, message: result.message });
        }
        return res.status(202).json({
            success: true,
            message: 'Notification deleted successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server Error: ${error.message}`,
        });
    }
}));
exports.default = destroyNotificationRouter;
