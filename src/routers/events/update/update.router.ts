import { Request, Response, Router } from 'express';
import { update_events_controller } from '../../../controllers/events/events.controller';
import { update_events_interface } from '../../../interfaces/events/events.interface';
const updateEventsRouter: Router = Router();

updateEventsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_events_interface = req.body;
        if (!field || !field.id) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        }
        const result = await update_events_controller(field);
        if (!result?.success) {
            return res.status(200).json({
                success: false,
                message: result?.message,
            });
        }
        return res.status(201).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error?.message}`,
        });
    }
});

export default updateEventsRouter;
