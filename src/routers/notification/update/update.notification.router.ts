import { Request, Response, Router } from 'express';
import { update_notification_controller } from '../../../controllers';
const updateNotificationRouter: Router = Router();
updateNotificationRouter.put('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad request' });
        }
        const result = await update_notification_controller(id);
        if (!result?.success) {
            return res
                .status(200)
                .json({ success: false, message: result.message });
        }
        return res.status(202).json({ success: true });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
});
export default updateNotificationRouter;
