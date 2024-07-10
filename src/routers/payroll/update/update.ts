import { Request, Response, Router } from 'express';
import { update_payroll_controller } from '../../../controllers/payroll/payroll.controller';
import { update_payroll } from '../../../interfaces/payroll/payroll.interface';

const updatePayrollRouter: Router = Router();

updatePayrollRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_payroll = req.body;
        if (!field || !field.id) {
            return res.status(400).json({
                success: false,
                message: 'bad request',
            });
        }
        const result = await update_payroll_controller(field);
        if (!result?.success) {
            return res.status(200).json({
                success: false,
                message: result?.message,
            });
        }
        return res.status(202).json({
            success: true,
            message: 'update payroll successfully',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error?.message}`,
        });
    }
});

export default updatePayrollRouter;
