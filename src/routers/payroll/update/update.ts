import { Request, Response, Router } from 'express';
import { update_payroll_controller } from '../../../controllers/payroll/payroll.controller';
import { update_payroll } from '../../../interfaces/payroll/payroll.interface';
import { errorResponse, successResponse } from '../../../helpers';

const updatePayrollRouter: Router = Router();

updatePayrollRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_payroll = req.body;
        if (!field || !field.id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await update_payroll_controller(field);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to update payroll');
        }
        return successResponse(res, 200, undefined, 'Payroll updated successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default updatePayrollRouter;
