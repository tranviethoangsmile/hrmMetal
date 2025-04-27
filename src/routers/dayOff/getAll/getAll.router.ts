import { Request, Response, Router } from 'express';
import { get_all_day_off_controller } from '../../../controllers';
const getAllDayOffRouter: Router = Router();

getAllDayOffRouter.get('/', async (req: Request, res: Response) => {
    try {
        const dayOffs = await get_all_day_off_controller();
        if (dayOffs?.success) {
            return res.status(202).json({
                success: true,
                data: dayOffs.data,
            });
        }
        return res.status(200).json({
            success: false,
            message: `${dayOffs?.message}`,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `serrver error :: ${error?.message}`,
        });
    }
});

export default getAllDayOffRouter;
