import { Request, Response, Router } from 'express';
import { create_notification_controller } from '../../../controllers';
import { create_notification_interface } from '../../../interfaces';

const createNotificationRouter: Router = Router();

createNotificationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_notification_interface = req.body;

        if (
            !field ||
            !field.message ||
            !field.title ||
            !field.type ||
            !field.user_id
        ) {
            const missingFields = [
                !field.message && 'message',
                !field.title && 'title',
                !field.type && 'type',
                !field.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            return res
                .status(400)
                .json({
                    success: false,
                    message: `Missing required ${missingFields}`,
                });
        }

        const notification = await create_notification_controller(field);
        if (!notification?.success) {
            return res.status(200).json({
                success: false,
                message: notification?.message,
            });
        }
        return res.status(201).json({
            success: true,
            data: notification?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error?.message}`,
        });
    }
});

export default createNotificationRouter;
