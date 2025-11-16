import { Request, Response, Router } from 'express';
import { search_plan_production_seven_day_of_department_controller } from '../../../controllers';
import { search_by_date_and_department } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const searchByDateOfDepartmentRouter: Router = Router();

searchByDateOfDepartmentRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const field: search_by_date_and_department = req.body;
            if (
                !field ||
                !field.department_id ||
                !field.end_date ||
                !field.start_date
            ) {
                return errorResponse(res, 400, 'department_id, start_date and end_date are required');
            }
            const planProductions = await search_plan_production_seven_day_of_department_controller(field);

            if (!planProductions?.success) {
                return errorResponse(res, 400, planProductions?.message || 'Failed to search plan production');
            }
            return successResponse(res, 200, planProductions?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default searchByDateOfDepartmentRouter;
