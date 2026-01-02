import { Request, Response, Router } from 'express';
import { create_day_off } from '../../../interfaces';
import { create_day_off_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
const createDayOffRouter: Router = Router();

createDayOffRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_day_off = req.body;
        if (!field || !field?.date || !field?.user_id) {
            return errorResponse(res, 400, 'Invalid input: date and user_id are required');
        }
        const day_off = await create_day_off_controller(field);
        if (!day_off?.success) {
            return errorResponse(res, 400, day_off?.message || 'Failed to create day off');
        }
        return successResponse(res, 201, day_off?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createDayOffRouter;
