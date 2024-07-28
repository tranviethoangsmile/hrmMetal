import { Request, Response, Router } from 'express';
import { destroy_notification_controller } from '../../../controllers';

const destroyNotificationRouter: Router = Router();

destroyNotificationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad request' });
        }
        const result = await destroy_notification_controller(id);
        if (!result?.success) {
            return res
                .status(200)
                .json({ success: false, message: result.message });
        }
        return res.status(202).json({
            success: true,
            message: 'Notification deleted successfully',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server Error: ${error.message}`,
        });
    }
});

export default destroyNotificationRouter;
