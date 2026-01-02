import { Request, Response, Router } from 'express';
import { get_all_day_off_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getAllDayOffRouter: Router = Router();

getAllDayOffRouter.get('/', async (req: Request, res: Response) => {
    try {
        const dayOffs = await get_all_day_off_controller();
        if (dayOffs?.success) {
            return successResponse(res, 200, dayOffs.data);
        }
        return errorResponse(res, 400, dayOffs?.message || 'Failed to get day offs');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getAllDayOffRouter;
