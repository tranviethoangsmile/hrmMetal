import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const LIMIT_HOURS_ORDER = 9;

const timeOrderLimit = (req: Request, res: Response, next: NextFunction) => {
    const { date } = req.body;

    // Kiểm tra nếu `date` không tồn tại hoặc không phải là chuỗi
    if (typeof date !== 'string' || !date.trim()) {
        return res.status(400).json({
            success: false,
            message:
                'Invalid date format: Date is required and must be a string',
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

export { timeOrderLimit };
