import { Request, Response, Router } from 'express';
import { get_overtime_request_by_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getOvertimeRequestByIdRouter: Router = Router();

getOvertimeRequestByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'ID is required');
        }
        const response = await get_overtime_request_by_id_controller(id);
        if (!response.success) {
            return errorResponse(res, 404, response.message || 'Overtime request not found');
        }
        return successResponse(res, 200, response.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default getOvertimeRequestByIdRouter;
