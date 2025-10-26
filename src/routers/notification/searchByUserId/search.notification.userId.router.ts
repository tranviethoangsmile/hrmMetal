import { Request, Response, Router } from 'express';
import { search_notification_of_user_controller } from '../../../controllers';
import { setCache, getCache, delCache } from '../../../utils';
const searchNotificationByUserIdRouter: Router = Router();

searchNotificationByUserIdRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.body.user_id;
            if (!id) {
                return res
                    .status(400)
                    .json({ success: false, message: 'id is required' });
            }
            const KEY_CACHE = `notification_user_${id}`;
            const notification_value_of_user = await getCache(KEY_CACHE);
            if (notification_value_of_user) {
                return res.status(202).json({
                    success: true,
                    data: JSON.parse(notification_value_of_user),
                });
            }
            const notifications = await search_notification_of_user_controller(
                id,
            );
            if (!notifications?.success) {
                return res.status(200).json({
                    success: false,
                    message: notifications.message,
                });
            }
            await setCache(KEY_CACHE, JSON.stringify(notifications?.data), 86400);
            return res.status(202).json({
                success: true,
                data: notifications?.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server error: ${error.message}`,
            });
        }
    },
);

export default searchNotificationByUserIdRouter;
