import { Router, Request, Response } from 'express';
import { find_report } from '../../../controllers/dailyReport/dailyReport.controler';
import moment from 'moment-timezone';
import { errorResponse, successResponse } from '../../../helpers';

const dailyRpRouter = Router();

dailyRpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != null) {
            if (data?.date != null) {
                const date = moment(data.date, 'YYYY/MM/DD');
                data.date = date.toISOString();
            }
            const reports = await find_report(data);
            if (reports?.success) {
                return successResponse(res, 200, reports?.data);
            } else {
                return errorResponse(res, 400, reports?.message || 'Failed to find reports');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default dailyRpRouter;
