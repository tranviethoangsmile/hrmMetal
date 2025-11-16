import { Router, Request, Response } from 'express';
import { delete_safety_report_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const deleteSafetyReportRouter: Router = Router();

deleteSafetyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;

        if (!id) {
            return errorResponse(res, 400, 'Safety report id is required');
        }
        const result = await delete_safety_report_controller(id);
        if (!result.success) {
            return errorResponse(res, 400, result.message || 'Failed to delete safety report');
        }
        return successResponse(res, 200, undefined, 'Safety report deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default deleteSafetyReportRouter;
