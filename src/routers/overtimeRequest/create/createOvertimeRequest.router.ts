import { Request, Response, Router } from 'express';
import { create_overtime_request_controller } from '../../../controllers';
import { ICreateOvertimeRequest } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const createOvertimeRequestRouter: Router = Router();

createOvertimeRequestRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data: ICreateOvertimeRequest = req.body;
        if (
            !data ||
            !data.user_id ||
            !data.department_id ||
            !data.leader_id ||
            !data.position ||
            !data.date ||
            !data.overtime_hours ||
            !data.description
        ) {
            const missingFields = [
                !data.user_id && 'user_id',
                !data.date && 'date',
                !data.position && 'position',
                !data.department_id && 'department_id',
                !data.overtime_hours && 'overtime_hours',
                !data.description && 'description',
                !data.leader_id && 'leader_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing values: ${missingFields}`);
        }
        const result = await create_overtime_request_controller(data);
        if (result?.success) {
            return successResponse(res, 201, result.data);
        }
        return errorResponse(res, 400, result?.message || 'Failed to create overtime request');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createOvertimeRequestRouter;
