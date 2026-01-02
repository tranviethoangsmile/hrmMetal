import { Request, Response, Router } from 'express';
import { daily_report_create } from '../../../controllers/dailyReport/dailyReport.controler';
import { create_daily_report } from '../../../interfaces/dailyReport/dailyReport.interface';
import { errorResponse, successResponse } from '../../../helpers';

const createDailyReportRouter: Router = Router();

createDailyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_daily_report = req.body;

        if (
            !field ||
            !field.date ||
            !field.operated_time ||
            !field.operator_history ||
            !field.product ||
            !field.shift ||
            !field.quantity ||
            !field.shutdown_time ||
            !field.user_id ||
            !field.department_id
        ) {
            const missingFields = [
                !field.date && 'date',
                !field.operated_time && 'operated_time',
                !field.operator_history && 'operator_history',
                !field.product && 'product',
                !field.shift && 'shift',
                !field.quantity && 'quantity',
                !field.shutdown_time && 'shutdown_time',
                !field.user_id && 'user_id',
                !field.department_id && 'department_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        } else {
            const dailyReport = await daily_report_create(field);
            if (dailyReport?.success) {
                return successResponse(res, 201, dailyReport?.data);
            } else {
                return errorResponse(res, 400, dailyReport?.message || 'Failed to create daily report');
            }
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createDailyReportRouter;
