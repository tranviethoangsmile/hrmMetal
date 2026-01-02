import { Router, Request, Response } from 'express';
import { get_all_safety_report_by_user_id_controller } from '../../../controllers';
import { IGetByUserId } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const getByUserIdRouter: Router = Router();

getByUserIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IGetByUserId = req.body;

        if (!field || !field.user_id || !field.date) {
            const missingFields = [
                !field?.user_id && 'user_id',
                !field?.date && 'date',
            ].filter(Boolean);
            return errorResponse(res, 400, `Missing required fields: ${missingFields.join(', ')}`);
        }

        const safetyReports = await get_all_safety_report_by_user_id_controller(field);
        if (!safetyReports?.success) {
            return errorResponse(res, 400, safetyReports?.message || 'Failed to get safety reports');
        }
        return successResponse(res, 200, safetyReports.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getByUserIdRouter;
