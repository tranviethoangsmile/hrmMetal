import { Request, Response, Router } from 'express';
import { create_day_off } from '../../../interfaces';
import { create_day_off_controller } from '../../../controllers';
const createDayOffRouter: Router = Router();

createDayOffRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_day_off = req.body;
        if (!field || !field?.date || !field?.user_id) {
            return res.status(400).json({
                success: false,
                message: `Invalid input: Request body is required`,
            });
        }
        const day_off = await create_day_off_controller(field);
        if (!day_off?.success) {
            return res.status(200).json({
                success: false,
                message: `${day_off?.message}`,
            });
        }
        return res.status(201).json({
            success: true,
            data: day_off?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error :: ${error?.message}`,
        });
    }
});

export default createDayOffRouter;
