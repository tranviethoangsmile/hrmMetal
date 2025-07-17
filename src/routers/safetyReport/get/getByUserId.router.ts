import { Router, Request, Response } from 'express';
import { get_all_safety_report_by_user_id_controller } from '../../../controllers';
import { IGetByUserId } from '../../../interfaces';
const getByUserIdRouter: Router = Router();

getByUserIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IGetByUserId = req.body;

        if (!field || !field.user_id || !field.date) {
            const missingFields = [
                !field.user_id && 'user_id',
                !field.date && 'date',
            ].filter(Boolean);
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }

        const safetyReports = await get_all_safety_report_by_user_id_controller(
            field,
        );
        if (!safetyReports?.success) {
            return res.status(200).json({
                success: false,
                message: safetyReports.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: safetyReports.data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

export default getByUserIdRouter;
