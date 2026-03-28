import { Request, Response, Router } from 'express';
import { search_payroll_of_user_in_month_controller } from '../../../controllers';
import { search_payroll } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const searchPayrollRouter: Router = Router();

searchPayrollRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_payroll = req.body;
        if (!field || !field.user_id || !field.date) {
            const missingFields =[
                !field?.date && 'date',
                !field?.user_id && 'user_id'
            ].filter(Boolean)
            .join(', ')
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const payroll = await search_payroll_of_user_in_month_controller(field);
        if (!payroll?.success) {
            return errorResponse(res, 200, payroll?.message || 'Failed to search payroll');
        }
        return successResponse(res, 202, payroll?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default searchPayrollRouter;
