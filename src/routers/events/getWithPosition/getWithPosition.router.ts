import { Request, Response, Router } from 'express';
import { get_events_with_position_controller } from '../../../controllers';
import { get_events_with_position } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const getEventsWithPositionRouter: Router = Router();

getEventsWithPositionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const position: get_events_with_position = req.body.position;
        if (!position) {
            return errorResponse(res, 400, 'position is required');
        }
        const events = await get_events_with_position_controller(position);
        if (!events?.success) {
            return errorResponse(res, 400, events?.message || 'Failed to get events');
        }
        return successResponse(res, 200, events?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getEventsWithPositionRouter;
