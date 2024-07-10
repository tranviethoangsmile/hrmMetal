import { Request, Response, Router } from 'express';
import { search_event_checked_controller } from '../../../controllers/evenCheck/evenCheck.controller';
import { search_event_checked } from '../../../interfaces/evenCheck/eventCheck.interface';
const searchEventCheckedRouter: Router = Router();

searchEventCheckedRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_event_checked = req.body;
        if (!field || !field.event_id || !field.user_id) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad Request' });
        }
        const result = await search_event_checked_controller(field);
        if (!result?.success) {
            throw new Error(result?.message);
        }
        return res.status(202).json({
            success: true,
            data: result?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error.message}`,
        });
    }
});
export default searchEventCheckedRouter;
