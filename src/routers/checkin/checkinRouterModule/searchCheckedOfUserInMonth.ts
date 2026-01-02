import { Request, Response, Router } from 'express';
import { search_checked_of_user_in_month_controller } from '../../../controllers/checkin/checkin.controller';
import { errorResponse, successResponse } from '../../../helpers';

const checkinSearchRouter = Router();

checkinSearchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const checked_value = await search_checked_of_user_in_month_controller(field);
            if (checked_value?.success) {
                return successResponse(res, 200, checked_value?.data);
            } else {
                return errorResponse(res, 400, checked_value?.message || 'Failed to search checkins');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default checkinSearchRouter;
