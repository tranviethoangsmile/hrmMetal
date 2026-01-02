import { Request, Response, Router } from 'express';
import { create_events_interface } from '../../../interfaces';
import { create_events_controller } from '../../../controllers';
import { create_media_path } from '../../../middlewares';
import { errorResponse, successResponse } from '../../../helpers';
const createEventsRouter: Router = Router();

createEventsRouter.post(
    '/',
    create_media_path,
    async (req: Request, res: Response) => {
        try {
            const { media_path, ...rest } = req.body;
            const field: create_events_interface = rest;
            if (media_path) {
                field.media = media_path;
            }
            if (
                !field ||
                !field.name ||
                !field.description ||
                !field.date_end ||
                !field.date_start ||
                !field.position
            ) {
                const missingFields = [
                    !field.name && 'name',
                    !field.description && 'description',
                    !field.date_end && 'date_end',
                    !field.date_start && 'date_start',
                    !field.position && 'position',
                ]
                    .filter(Boolean)
                    .join(', ');
                return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
            }
            const event = await create_events_controller(field);
            if (!event?.success) {
                return errorResponse(res, 400, event.message || 'Failed to create event');
            }
            return successResponse(res, 201, event?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default createEventsRouter;
