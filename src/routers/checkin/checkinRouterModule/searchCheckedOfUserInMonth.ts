import { Request, Response, Router } from 'express';
import { search_checked_of_user_in_month_controller } from '../../../controllers/checkin/checkin.controller';

const checkinSearchRouter = Router();

checkinSearchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id;
        console.log(user_id);
        const checked_value = await search_checked_of_user_in_month_controller(
            user_id,
        );
        if (checked_value?.success) {
            res.status(201).json({
                success: true,
                data: checked_value?.data,
            });
        } else {
            res.status(200).json({
                success: false,
                message: checked_value?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + error?.message,
        });
    }
});

export default checkinSearchRouter;
