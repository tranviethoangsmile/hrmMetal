import { Request, Response, Router } from 'express';
import { delete_paid_leave_request_by_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const deletePaidLeaveRouter: Router = Router();

deletePaidLeaveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const delete_value = req.body;
        if (!delete_value.id || !delete_value.user_id) {
            const missingFields = [
                !delete_value.id && 'id',
                !delete_value.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing values: ${missingFields}`);
        }
        const result = await delete_paid_leave_request_by_id_controller(delete_value);
        if (!result.success) {
            return errorResponse(res, 400, result?.message || 'Failed to delete paid leave request');
        }
        return successResponse(res, 200, undefined, 'Paid leave request deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default deletePaidLeaveRouter;
