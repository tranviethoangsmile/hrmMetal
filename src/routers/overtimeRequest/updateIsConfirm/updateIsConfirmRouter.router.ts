import { Request, Response, Router } from 'express';
import { update_isConfirm_ovetime_request_controller } from '../../../controllers';
import { IUpdateOvertimeRequest } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const updateIsConfirmOvertimeRequestRouter: Router = Router();

updateIsConfirmOvertimeRequestRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const data: IUpdateOvertimeRequest = req.body;
            if (!data || !data.user_id || !data.id) {
                const missingFields = [
                    !data?.user_id && 'user_id',
                    !data?.id && 'id',
                ]
                    .filter(Boolean)
                    .join(', ');
                return errorResponse(res, 400, `Missing values: ${missingFields}`);
            }
            const response = await update_isConfirm_ovetime_request_controller(data);
            if (!response.success) {
                return errorResponse(res, 400, response.message || 'Failed to update overtime request');
            }
            return successResponse(res, 200, undefined, 'Overtime request updated successfully');
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);
export default updateIsConfirmOvertimeRequestRouter;
