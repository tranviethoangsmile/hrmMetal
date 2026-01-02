import { Request, Response, Router } from 'express';
import { update_notification_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const updateNotificationRouter: Router = Router();

updateNotificationRouter.put('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await update_notification_controller(id);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to update notification');
        }
        return successResponse(res, 200, undefined, 'Notification updated successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default updateNotificationRouter;
