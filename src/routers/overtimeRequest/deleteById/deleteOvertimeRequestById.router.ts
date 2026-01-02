import { Request, Response, Router } from 'express';
import { delete_overtime_request_by_id_controller } from '../../../controllers';
import { IDeleteOvertimeRequest } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const deleteOvertimeRequestByIdRouter: Router = Router();

deleteOvertimeRequestByIdRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const data: IDeleteOvertimeRequest = req.body;
            if (!data || !data.id || !data.user_id) {
                const missingFields = [
                    !data?.user_id && 'user_id',
                    !data?.id && 'id',
                ]
                    .filter(Boolean)
                    .join(', ');

                return errorResponse(res, 400, `Missing values: ${missingFields}`);
            }
            const response = await delete_overtime_request_by_id_controller(data);
            if (!response.success) {
                return errorResponse(res, 400, response.message || 'Failed to delete overtime request');
            }
            return successResponse(res, 200, undefined, 'Overtime request deleted successfully');
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);
export default deleteOvertimeRequestByIdRouter;
