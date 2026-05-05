import { Router, Request, Response } from 'express';
import { findCodeErrorsByDailyReportIdController } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const findByDailyReportIdRouter: Router = Router();

findByDailyReportIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const dailyReportId: string = req.body.daily_report_id;
        if (!dailyReportId || dailyReportId === '' || typeof dailyReportId !== 'string') {
            return errorResponse(res, 400, 'dailyReportId is required');
        }
        const result = await findCodeErrorsByDailyReportIdController(dailyReportId);
        if (!result?.success) {
            return errorResponse(res, 200, result?.message || 'Failed to find code errors');
        }
        return successResponse(res, 202, result?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default findByDailyReportIdRouter;