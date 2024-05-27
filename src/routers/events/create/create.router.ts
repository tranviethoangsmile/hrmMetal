import { Request, Response, Router } from 'express';
import { create_events_interface } from '../../../interfaces/events/events.interface';
import { create_events_controller } from '../../../controllers/events/events.controller';
const createEventsRouter: Router = Router();

createEventsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_events_interface = req.body;
        if (!field || !field.name) {
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
});

export default createEventsRouter;
