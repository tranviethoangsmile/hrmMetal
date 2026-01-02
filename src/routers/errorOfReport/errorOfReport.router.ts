import { Router, Request, Response } from 'express';
import { find_err_of_report } from '../../controllers/errorOfReport/errorOfReport.controller';
import { errorResponse, successResponse } from '../../helpers';

const errOfRpRouter: Router = Router();

errOfRpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const daily_report_id: object | null = req.body;
        if (daily_report_id != null) {
            const errs = await find_err_of_report(daily_report_id);
            if (errs?.success) {
                return successResponse(res, 201, errs?.data);
            } else {
                return errorResponse(res, 400, errs?.message || 'Failed to find errors');
            }
        } else {
            return errorResponse(res, 400, 'daily_report_id is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default errOfRpRouter;
