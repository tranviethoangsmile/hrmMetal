"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeOrderLimit = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LIMIT_HOURS_ORDER_FROM = 7;
const LIMIT_HOURS_ORDER_TO = 9;
const timeOrderLimit = (req, res, next) => {
    const requestDateString = req.body.date;
    const requestDate = new Date(requestDateString);
    const currentDate = new Date();
    const currentHour = new Date().getHours();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const requestDay = requestDate.getDate();
    const requestMonth = requestDate.getMonth();
    const requestYear = requestDate.getFullYear();
    if (requestYear > currentYear ||
        (requestYear === currentYear && requestMonth > currentMonth) ||
        (requestYear === currentYear &&
            requestMonth === currentMonth &&
            requestDay > currentDay)) {
        return next();
    }
    else if (requestDay === currentDay &&
        requestMonth === currentMonth &&
        requestYear === currentYear &&
        currentHour >= LIMIT_HOURS_ORDER_FROM &&
        currentHour <= LIMIT_HOURS_ORDER_TO) {
        return next();
    }
    else {
        res.status(200).json({
            success: false,
            message: 'time',
        });
    }
};
exports.timeOrderLimit = timeOrderLimit;
