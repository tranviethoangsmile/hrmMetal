import { Request, Response, Router } from 'express';
import { search_event_by_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const searchEventById: Router = Router();

searchEventById.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const event = await search_event_by_id_controller(id);
        if (!event?.success) {
            return errorResponse(res, 404, event?.message || 'Event not found');
        }
        return successResponse(res, 200, event?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default searchEventById;
