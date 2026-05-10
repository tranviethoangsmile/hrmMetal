import { Request, Response, Router } from 'express';
import { daily_report_create } from '../../../controllers/dailyReport/dailyReport.controler';
import { create_daily_report } from '../../../interfaces/dailyReport/dailyReport.interface';
import { errorResponse, successResponse } from '../../../helpers';

const createDailyReportRouter: Router = Router();

createDailyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return errorResponse(res, 400, 'Request body is required');
        }

        const field: create_daily_report = req.body;
        const missingFields = [
            (!field.product || field.product.trim() === '') && 'product',
            (!field.user_id || field.user_id.trim() === '') && 'user_id',
            (!field.department_id || field.department_id.trim() === '') &&
                'department_id',
            (!field.date || field.date.trim() === '') && 'date',
            (!field.shift || field.shift.trim() === '') && 'shift',
            (field.quantity === undefined || field.quantity === null) &&
                'quantity',
            (field.good_quantity === undefined || field.good_quantity === null) &&
                'good_quantity',
            (field.defective_quantity === undefined || field.defective_quantity === null) &&
                'defective_quantity',
            (field.cycle_time === undefined || field.cycle_time === null) &&
                'cycle_time',
            (field.operated_time === undefined || field.operated_time === null) &&
                'operated_time',
            (field.shutdown_time === undefined || field.shutdown_time === null) &&
                'shutdown_time',
            (!field.operator_history || field.operator_history.trim() === '') &&
                'operator_history',
        ].filter(Boolean);

        if (missingFields.length > 0) {
            return errorResponse(
                res,
                400,
                `Invalid input: Missing required ${missingFields.join(', ')}`,
            );
        }

        const dailyReport = await daily_report_create(field);
        if (dailyReport?.success) {
            return successResponse(res, 201, dailyReport?.data);
        } else {
            return errorResponse(res, 200, dailyReport?.message || 'Failed to create daily report');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createDailyReportRouter;
