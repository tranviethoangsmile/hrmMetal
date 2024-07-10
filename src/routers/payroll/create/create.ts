import { Request, Response, Router } from 'express';
import { create_payroll_controller } from '../../../controllers/payroll/payroll.controller';
import { create_payroll } from '../../../interfaces/payroll/payroll.interface';

const createPayrollRouter: Router = Router();
createPayrollRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_payroll = req.body;
        if (
            !field ||
            !field.date ||
            !field.pay_date ||
            !field.user_id ||
            !field.gross_salary ||
            !field.net_salary
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request',
            });
        }

        const payroll = await create_payroll_controller(field);
        if (!payroll?.success) {
            return res.status(200).json({
                success: false,
                message: payroll?.message,
            });
        }
        return res.status(201).json({
            success: true,
            data: payroll?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error?.message}`,
        });
    }
});

export default createPayrollRouter;
