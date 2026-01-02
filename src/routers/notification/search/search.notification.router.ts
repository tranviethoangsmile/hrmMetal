import { Request, Response, Router } from 'express';
import { search_notification_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const searchNotificationRouter: Router = Router();

searchNotificationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }

        const notification = await search_notification_controller(id);
        if (!notification?.success) {
            return errorResponse(res, 404, notification?.message || 'Notification not found');
        }
        return successResponse(res, 200, notification?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default searchNotificationRouter;
