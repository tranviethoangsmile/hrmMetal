import { Request, Response, Router } from 'express';
import { create_notification_controller } from '../../../controllers';
import { create_notification_interface } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

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
            return errorResponse(res, 400, `Missing required ${missingFields}`);
        }

        const notification = await create_notification_controller(field);
        if (!notification?.success) {
            return errorResponse(res, 400, notification?.message || 'Failed to create notification');
        }
        return successResponse(res, 201, notification?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createNotificationRouter;
