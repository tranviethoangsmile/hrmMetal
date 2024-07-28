import { Request, Response, Router } from 'express';
import { search_notification_controller } from '../../../controllers';

const searchNotificationRouter: Router = Router();

searchNotificationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'id is required' });
        }

        const notification = await search_notification_controller(id);
        if (!notification?.success) {
            return res.status(200).json({
                success: false,
                message: notification.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: notification?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
});

export default searchNotificationRouter;
