import { Request, Response, Router } from 'express';
import { get_events_with_position_controller } from '../../../controllers';
import { get_events_with_position } from '../../../interfaces';
const getEventsWithPositionRouter: Router = Router();

getEventsWithPositionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const position: get_events_with_position = req.body.position;
        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        }
        const events = await get_events_with_position_controller(position);
        if (!events?.success) {
            return res.status(200).json({
                success: false,
                message: `${events?.message}`,
            });
        }
        return res.status(202).json({
            success: true,
            data: events?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server -- ${error?.message}`,
        });
    }
});

export default getEventsWithPositionRouter;
