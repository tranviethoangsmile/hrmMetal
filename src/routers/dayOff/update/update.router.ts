import { Request, Response, Router } from 'express';
import { update_day_off_by_id_controller } from '../../../controllers';
import { update_day_off } from '../../../interfaces';
const updateDayOffRouter: Router = Router();

updateDayOffRouter.put('/', async (req: Request, res: Response) => {
    try {
        const field: update_day_off = req.body;

        if (!field || !field?.id || field?.id?.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'id is required',
            });
        }
        const result = await update_day_off_by_id_controller(field);
        if (!result?.success) {
            return res.status(200).json({
                success: false,
                message: result?.message,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error :: ${error?.message}`,
        });
    }
});

export default updateDayOffRouter;
