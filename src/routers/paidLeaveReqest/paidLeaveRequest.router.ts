import { Router, Request, Response } from 'express';
import create_router from './create/create';
import searchLeaveRouter from './search/searchPaidLeaveRequestWithField.router';
import unApproveRouter from './update/updateUnApproveLeave.router';
import updateConfirmRouter from './update/updateConfirmLeave.router';
import deletePaidLeaveRouter from './delete/deletePaidLeave.router';
import {
    get_all_paid_leave_controller,
    update_is_active_paid_leave_controller,
} from '../../controllers/paidLeaveRequest/paidLeaveRequest.controller';

import very_role from '../../middlewares/veryRoleUpdate.middleware';
import { errorResponse, successResponse } from '../../helpers';

const paidLeaveRouter: Router = Router();
paidLeaveRouter.use('/create', create_router);
paidLeaveRouter.use('/search', searchLeaveRouter);
paidLeaveRouter.use('/update', unApproveRouter);
paidLeaveRouter.use('/updateconfirm', updateConfirmRouter);
paidLeaveRouter.use('/delete', deletePaidLeaveRouter);

paidLeaveRouter.get('/', async (req: Request, res: Response) => {
    try {
        const paid_leaves = await get_all_paid_leave_controller();
        if (paid_leaves?.success) {
            return successResponse(res, 200, paid_leaves?.data);
        } else {
            return errorResponse(res, 400, paid_leaves?.message || 'Failed to get paid leave requests');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

paidLeaveRouter.put('/', very_role, async (req: Request, res: Response) => {
    try {
        const data: Object | null = req.body;
        if (data != null) {
            const paid_leave = await update_is_active_paid_leave_controller(data);
            if (paid_leave?.success) {
                return successResponse(res, 200, undefined, paid_leave?.message || 'Paid leave updated successfully');
            } else {
                return errorResponse(res, 400, paid_leave?.message || 'Failed to update paid leave');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default paidLeaveRouter;
