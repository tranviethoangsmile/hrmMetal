import { Request, Response, Router } from 'express';
import { search_notification_of_user_controller } from '../../../controllers';
import { setCache, getCache, delCache } from '../../../utils';
import { errorResponse, successResponse } from '../../../helpers';

const searchNotificationByUserIdRouter: Router = Router();

searchNotificationByUserIdRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.body.user_id;
            if (!id) {
                return errorResponse(res, 400, 'user_id is required');
            }
            const KEY_CACHE = `notification_user_${id}`;
            const notification_value_of_user = await getCache(KEY_CACHE);
            if (notification_value_of_user) {
                return successResponse(res, 200, JSON.parse(notification_value_of_user));
            }
            const notifications = await search_notification_of_user_controller(id);
            if (!notifications?.success) {
                return errorResponse(res, 400, notifications?.message || 'Failed to get notifications');
            }
            await setCache(KEY_CACHE, JSON.stringify(notifications?.data), 86400);
            return successResponse(res, 200, notifications?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default searchNotificationByUserIdRouter;
