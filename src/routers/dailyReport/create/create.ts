import { Request, Response, Router } from 'express';
import { daily_report_create } from '../../../controllers/dailyReport/dailyReport.controler';
import { create_daily_report } from '../../../interfaces/dailyReport/dailyReport.interface';
const createDailyReportRouter: Router = Router();

createDailyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_daily_report = req.body;

        if (
            !field ||
            !field.date ||
            !field.operated_time ||
            !field.operator_history ||
            !field.product ||
            !field.shift ||
            !field.quantity ||
            !field.shutdown_time ||
            !field.user_id ||
            !field.department_id
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields, data not empty',
            });
        } else {
            const dailyReport = await daily_report_create(field);
            if (dailyReport?.success) {
                return res.status(201).json({
                    success: true,
                    data: dailyReport?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: `${dailyReport?.message}`,
                });
            }
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `${error?.message} server error`,
        });
    }
});

export default createDailyReportRouter;
