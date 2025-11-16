import { Router, Request, Response } from 'express';
import { update_un_approve_leave_request_controller } from '../../../controllers/paidLeaveRequest/paidLeaveRequest.controller';
import { errorResponse, successResponse } from '../../../helpers';

const unApproveRouter: Router = Router();

unApproveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const update = await update_un_approve_leave_request_controller(field);
            if (update?.success) {
                return successResponse(res, 200, undefined, update?.message || 'Leave request unapproved successfully');
            } else {
                return errorResponse(res, 400, update?.message || 'Failed to unapprove leave request');
            }
        } else {
            return errorResponse(res, 400, 'Missing data');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default unApproveRouter;
