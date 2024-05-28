import { Request, Response, Router } from 'express';
import { search_safety_checked_controller } from '../../../controllers/safetyCheck/safetyCheck.controller';
import { search_safety_checked_interface } from '../../../interfaces/safetyCheck/safetyCheck.interface';
const searchSafetyCheckedRouter: Router = Router();

searchSafetyCheckedRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_safety_checked_interface = req.body;
        console.log(field);
        if (!field || !field.event_id || !field.user_id) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad Request' });
        }
        const result = await search_safety_checked_controller(field);
        if (!result?.success) {
            throw new Error(result?.message);
        }
        return res.status(201).json({
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
export default searchSafetyCheckedRouter;
