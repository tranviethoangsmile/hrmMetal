import { Router, Request, Response } from 'express';
import { update_confirm_from_admin_paid_leave_request_controller } from '../../../controllers';
import { IUpdatePaidLeave } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const updateConfirmRouter: Router = Router();

updateConfirmRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IUpdatePaidLeave = req.body;

        if (!field?.admin_id && !field?.user_id && !field?.id) {
            return errorResponse(res, 400, 'admin_id, user_id and id are required');
        }
        const update_confirm = await update_confirm_from_admin_paid_leave_request_controller(field);
        if (!update_confirm?.success) {
            return errorResponse(res, 400, update_confirm?.message || 'Failed to confirm leave request');
        }
        return successResponse(res, 200, undefined, update_confirm?.message || 'Leave request confirmed successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default updateConfirmRouter;
