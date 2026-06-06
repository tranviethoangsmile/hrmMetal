"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeOrderLimit = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LIMIT_HOURS_ORDER = 9;
const timeOrderLimit = (req, res, next) => {
    const { date } = req.body;
    // Kiểm tra nếu `date` không tồn tại hoặc không phải là chuỗi
    if (typeof date !== 'string' || !date.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Invalid date format: Date is required and must be a string',
        });
    }
    // Kiểm tra định dạng ngày (yyyy-mm-dd)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid date format: Must be in yyyy-mm-dd format',
        });
    }
    const requestDate = new Date(date);
    const currentDate = new Date();
    // Kiểm tra nếu ngày yêu cầu là tương lai
    if (requestDate > currentDate) {
        return next();
    }
    // Kiểm tra nếu ngày yêu cầu là hôm nay và giờ hiện tại nhỏ hơn giới hạn
    const isSameDay = requestDate.toDateString() === currentDate.toDateString();
    const currentHour = currentDate.getHours();
    if (isSameDay && currentHour < LIMIT_HOURS_ORDER) {
        return next();
    }
    // Nếu không thỏa mãn điều kiện, trả về lỗi
    return res.status(200).json({
        success: false,
        message: 'Order time has expired',
    });
};
exports.timeOrderLimit = timeOrderLimit;
