import { Request, Response, Router } from 'express';
import { create_payroll_controller } from '../../../controllers/payroll/payroll.controller';
import { create_payroll } from '../../../interfaces/payroll/payroll.interface';
import { errorResponse, successResponse } from '../../../helpers';

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
            const missingFields = [
                !field.date && 'date',
                !field.pay_date && 'pay_date',
                !field.user_id && 'user_id',
                !field.gross_salary && 'gross_salary',
                !field.net_salary && 'net_salary',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }

        const payroll = await create_payroll_controller(field);
        if (!payroll?.success) {
            return errorResponse(res, 400, payroll?.message || 'Failed to create payroll');
        }
        return successResponse(res, 201, payroll?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createPayrollRouter;
