import { Request, Response, Router } from 'express';
import { destroy_payroll_controller } from '../../../controllers/payroll/payroll.controller';
import { errorResponse, successResponse } from '../../../helpers';

const destroyPayrollRouter: Router = Router();

destroyPayrollRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await destroy_payroll_controller(id);
        if (!result.success) {
            return errorResponse(res, 400, result?.message || 'Failed to delete payroll');
        }
        return successResponse(res, 200, undefined, 'Payroll deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default destroyPayrollRouter;
