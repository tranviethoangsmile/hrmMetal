import { Router, Request, Response } from 'express';
import { update_un_approve_leave_request_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
import { very_role } from '../../../middlewares';
import { IUpdatePaidLeave } from '../../../interfaces';
const unApproveRouter: Router = Router();

unApproveRouter.post('/',very_role, async (req: Request, res: Response) => {
    try {
        const field: IUpdatePaidLeave = req.body;
        if(!field?.id){
            return errorResponse(res, 400, `bad request`)
        }
        const update = await update_un_approve_leave_request_controller(field);
        if(!update?.success){
            return errorResponse(res, 200, update?.message || 'Failed to unapprove leave request')
        }
        return successResponse(res, 202)
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default unApproveRouter;
