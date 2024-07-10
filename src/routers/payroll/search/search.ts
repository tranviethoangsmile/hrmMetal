import { Request, Response, Router } from 'express';
import { search_payroll_of_user_in_month_controller } from '../../../controllers/payroll/payroll.controller';
import { search_payroll } from '../../../interfaces/payroll/payroll.interface';
const searchPayrollRouter: Router = Router();

searchPayrollRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_payroll = req.body;
        if (!field || !field.user_id || !field.date) {
            return res
                .status(400)
                .json({ success: false, message: 'Invalid request' });
        }
        const payroll = await search_payroll_of_user_in_month_controller(field);
        if (!payroll?.success) {
            return res.status(200).json({
                success: false,
                message: payroll?.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: payroll?.data,
        });
    } catch (error: any) {}
});

export default searchPayrollRouter;
