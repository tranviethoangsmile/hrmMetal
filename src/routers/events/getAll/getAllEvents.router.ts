import { Request, Response, Router } from 'express';
import { get_all_events_controller } from '../../../controllers/events/events.controller';
const getAllEventRouter: Router = Router();

getAllEventRouter.get('/', async (req: Request, res: Response) => {
    try {
        const events = await get_all_events_controller();
        if (!events?.success) {
            return res.status(200).json({
                success: false,
                message: events?.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: events?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error?.message}`,
        });
    }
});
export default getAllEventRouter;
