import { Request, Response, Router } from 'express';
import { search_safety_checked_controller } from '../../../controllers';
import { search_safety_checked_interface } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const searchSafetyCheckedRouter: Router = Router();

searchSafetyCheckedRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_safety_checked_interface = req.body;
        if (!field || !field.event_id || !field.user_id) {
            const missingFields = [
                !field.event_id && 'event_id',
                !field.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Bad request: Missing required ${missingFields}`);
        }
        const result = await search_safety_checked_controller(field);
        if (!result?.success) {
            return errorResponse(res, 200, result?.message || 'Failed to search safety checked');
        }
        return successResponse(res, 202, result?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default searchSafetyCheckedRouter;
