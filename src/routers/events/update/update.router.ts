import { Request, Response, Router } from 'express';
import { update_events_controller } from '../../../controllers';
import { update_events_interface } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const updateEventsRouter: Router = Router();

updateEventsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_events_interface = req.body;
        if (!field || !field.id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await update_events_controller(field);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to update event');
        }
        return successResponse(res, 200, undefined, 'Event updated successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default updateEventsRouter;
