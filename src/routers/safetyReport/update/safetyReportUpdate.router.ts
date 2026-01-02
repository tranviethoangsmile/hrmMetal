import { Router, Request, Response } from 'express';
import { update_safety_report_controller } from '../../../controllers';
import { IUpdateSafetyReport } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const updateSafetyReportRouter: Router = Router();

updateSafetyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IUpdateSafetyReport = req.body;

        if (!field || !field.id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await update_safety_report_controller(field);
        if (!result.success) {
            return errorResponse(res, 400, result?.message || 'Failed to update safety report');
        }
        return successResponse(res, 200, undefined, 'Safety report updated successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default updateSafetyReportRouter;
