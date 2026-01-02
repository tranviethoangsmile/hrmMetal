import { Request, Response, Router } from 'express';
import { search_event_checked_controller } from '../../../controllers';
import { search_event_checked } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const searchEventCheckedRouter: Router = Router();

searchEventCheckedRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_event_checked = req.body;
        if (!field || !field.event_id || !field.user_id) {
            return errorResponse(res, 400, 'event_id and user_id are required');
        }
        const result = await search_event_checked_controller(field);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to search event checked');
        }
        return successResponse(res, 200, result?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default searchEventCheckedRouter;
