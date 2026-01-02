import { Router, Request, Response } from 'express';
import { get_all_safety_report_by_department_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getByDepartmentIdRouter: Router = Router();

getByDepartmentIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const departmentId: string = req.body.id;

        if (!departmentId) {
            return errorResponse(res, 400, 'Department ID is required');
        }

        const safetyReports = await get_all_safety_report_by_department_id_controller(departmentId);
        if (!safetyReports?.success) {
            return errorResponse(res, 400, safetyReports?.message || 'Failed to get safety reports');
        }
        return successResponse(res, 200, safetyReports.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getByDepartmentIdRouter;
