import { Router, Request, Response } from 'express';
import { get_overtime_request_by_user_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getOvertimeByUserIdRouter: Router = Router();

getOvertimeByUserIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await get_overtime_request_by_user_id_controller(id);
        if (!result.success) {
            return errorResponse(res, 400, result.message || 'Failed to get overtime requests');
        }
        return successResponse(res, 200, result.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default getOvertimeByUserIdRouter;
