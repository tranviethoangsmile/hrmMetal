import { Request, Response, Router } from 'express';
import { update_day_off_by_id_controller } from '../../../controllers';
import { update_day_off } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const updateDayOffRouter: Router = Router();

updateDayOffRouter.put('/', async (req: Request, res: Response) => {
    try {
        const field: update_day_off = req.body;

        if (!field || !field?.id || field?.id?.trim() === '') {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await update_day_off_by_id_controller(field);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to update day off');
        }
        return successResponse(res, 200, undefined, 'Day off updated successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default updateDayOffRouter;
