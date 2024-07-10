import { Request, Response, Router } from 'express';
import { get_checkin_detail_in_date_of_user_controller } from '../../../controllers/checkin/checkin.controller';

const checkinDetailRouter: Router = Router();

checkinDetailRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | undefined = req.body;
        if (field != undefined) {
            const checkin_detail =
                await get_checkin_detail_in_date_of_user_controller(field);
            if (checkin_detail?.success) {
                return res.status(202).json({
                    success: true,
                    data: checkin_detail?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: checkin_detail?.message,
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

export default checkinDetailRouter;
