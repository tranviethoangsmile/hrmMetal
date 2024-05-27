import { Request, Response, Router } from 'express';
import { create_safety_check_controller } from '../../../controllers/safetyCheck/safetyCheck.controller';
import { create_safety_check_interface } from '../../../interfaces/safetyCheck/safetyCheck.interface';
import { create_infomation } from '../../../interfaces/infomation/infomation.interface';
const createSafetyCheckRouter: Router = Router();

createSafetyCheckRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_safety_check_interface = req.body;
        console.log(field);
        if (
            !field ||
            !field.event_id ||
            !field.is_at_home ||
            !field.is_can_work ||
            !field.user_id ||
            !field.is_safety
        ) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad request' });
        }

        const create_safety_check = await create_safety_check_controller(field);
        if (!create_safety_check?.success) {
            throw new Error(create_safety_check?.message);
        }
        return res.status(201).json({
            success: true,
            data: create_safety_check?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error?.message}`,
        });
    }
});

export default createSafetyCheckRouter;
