import { Request, Response, Router } from 'express';
import { get_all_overtime_request_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getAllOvertimeRequestRouter: Router = Router();

getAllOvertimeRequestRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await get_all_overtime_request_controller();
        if (!response.success) {
            return errorResponse(res, 400, response.message || 'Failed to get overtime requests');
        }
        return successResponse(res, 200, response.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default getAllOvertimeRequestRouter;
