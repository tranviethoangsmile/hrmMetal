import { Request, Response, Router } from 'express';
import { search_checked_of_user_in_month_controller } from '../../../controllers/checkin/checkin.controller';

const checkinSearchRouter = Router();

checkinSearchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const checked_value =
                await search_checked_of_user_in_month_controller(field);
            if (checked_value?.success) {
                return res.status(202).json({
                    success: true,
                    data: checked_value?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: checked_value?.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'data not empty',
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
