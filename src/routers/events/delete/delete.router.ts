import { Request, Response, Router } from 'express';
import { delete_event_controller } from '../../../controllers/events/events.controller';
const deleteEventsRouter: Router = Router();
deleteEventsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (id === undefined || id === null) {
            return res.status(400).json({
                success: false,
                message: 'id is required',
            });
        }
        const result = await delete_event_controller(id);
        if (!result?.success) {
            return res.status(200).json({
                success: false,
                message: result?.message,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error.message}`,
        });
    }
});
export default deleteEventsRouter;
