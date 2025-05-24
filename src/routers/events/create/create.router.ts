import { Request, Response, Router } from 'express';
import { create_events_interface } from '../../../interfaces';
import { create_events_controller } from '../../../controllers';
import { create_media_path } from '../../../middlewares';
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
                return res.status(400).json({
                    success: false,
                    message: `Invalid input: Missing required ${missingFields}`,
                });
            }
            const event = await create_events_controller(field);
            if (!event?.success) {
                return res.status(201).json({
                    success: false,
                    message: event.message,
                });
            }
            return res.status(201).json({
                success: true,
                data: event?.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server -- ${error.message}`,
            });
        }
    },
);

export default createEventsRouter;
