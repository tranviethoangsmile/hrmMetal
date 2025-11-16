import { Request, Response, Router } from 'express';
import { search_payroll_by_id_controller } from '../../../controllers/payroll/payroll.controller';
import { errorResponse, successResponse } from '../../../helpers';

const searchPayrollByIdRouter: Router = Router();

searchPayrollByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (id === undefined) {
            return errorResponse(res, 400, 'id is required');
        }
        const payroll = await search_payroll_by_id_controller(id);
        if (!payroll?.success) {
            return errorResponse(res, 404, payroll?.message || 'Payroll not found');
        }
        return successResponse(res, 200, payroll?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default searchPayrollByIdRouter;
