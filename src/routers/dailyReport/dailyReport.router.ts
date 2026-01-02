import { Router, Request, Response } from 'express';
import {
    daily_report_create,
    find_all_report,
    find_report_by_id,
} from '../../controllers/dailyReport/dailyReport.controler';
import dailyRpRouter from './moduleReportRouter/dailyReport.router';
import createDailyReportRouter from './create/create';
import getAllDailyReport from './getAllDailyReport/getAllDailyReport.router';
import { errorResponse, successResponse } from '../../helpers';

const rpRouter: Router = Router();
rpRouter.use('/create', createDailyReportRouter);
rpRouter.use('/getall', getAllDailyReport);
rpRouter.use('/search', dailyRpRouter);
rpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != null) {
            const created_rp = await daily_report_create(data);
            if (created_rp?.success) {
                return successResponse(res, 201, created_rp?.data);
            } else {
                return errorResponse(res, 400, created_rp?.message || 'Failed to create daily report');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

rpRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.params.id;
        if (id != null) {
            const report = await find_report_by_id(id);
            if (report?.success) {
                return successResponse(res, 200, report?.data);
            } else {
                return errorResponse(res, 404, 'report not found');
            }
        } else {
            return errorResponse(res, 400, 'id is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default rpRouter;
