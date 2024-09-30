"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = void 0;
const handlePushNotification_1 = __importDefault(require("./pushNotification/handlePushNotification"));
exports.sendPushNotification = handlePushNotification_1.default;
