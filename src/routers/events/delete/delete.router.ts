import { Request, Response, Router } from 'express';
import { delete_event_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const deleteEventsRouter: Router = Router();

deleteEventsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (id === undefined || id === null) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await delete_event_controller(id);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to delete event');
        }
        return successResponse(res, 200, undefined, 'Event deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default deleteEventsRouter;
