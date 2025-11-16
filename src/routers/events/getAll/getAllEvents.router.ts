import { Request, Response, Router } from 'express';
import { get_all_events_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getAllEventRouter: Router = Router();

getAllEventRouter.get('/', async (req: Request, res: Response) => {
    try {
        const events = await get_all_events_controller();
        if (!events?.success) {
            return errorResponse(res, 400, events?.message || 'Failed to get events');
        }
        return successResponse(res, 200, events?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default getAllEventRouter;
