import { Request, Response, Router } from 'express';
import { upload } from '../../../utils/multer/upload.multer';
import { create_events_interface } from '../../../interfaces/events/events.interface';
import { create_events_controller } from '../../../controllers/events/events.controller';
import { create_media_path } from '../../../middlewares/createTrainning.middleware';
const createEventsRouter: Router = Router();

createEventsRouter.post(
    '/',
    upload.single('media'),
    create_media_path,
    async (req: Request, res: Response) => {
        try {
            const { media_url, ...rest } = req.body;
            console.log(rest);
            const field: create_events_interface = rest;
            if (media_url) {
                field.media = media_url;
            }
            if (
                !field ||
                !field.name ||
                !field.description ||
                !field.date_end ||
                !field.date_start ||
                !field.position
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing field',
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
                message: `server: ${error.message}`,
            });
        }
    },
);

export default createEventsRouter;
