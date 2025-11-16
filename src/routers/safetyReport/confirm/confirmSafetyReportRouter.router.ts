import { Router, Request, Response } from 'express';
import { confirm_safety_report_controller } from '../../../controllers';
import { IConfirmSafetyReport } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const confirmSafetyReportRouter: Router = Router();

confirmSafetyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IConfirmSafetyReport = req.body;

        if (!field || !field.id || !field.leader_id) {
            return errorResponse(res, 400, 'id and leader_id are required');
        }
        const result = await confirm_safety_report_controller(field);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to confirm safety report');
        }
        return successResponse(res, 200, undefined, 'Safety report confirmed successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default confirmSafetyReportRouter;
