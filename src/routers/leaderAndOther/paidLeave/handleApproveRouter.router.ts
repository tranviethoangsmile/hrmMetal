import { Router, Request, Response } from "express";
import { successResponse, errorResponse } from "../../../helpers";
import { update_approve_leave_request_controller } from "../../../controllers";
import { IUpdateApprovePaidLeave } from "../../../interfaces";
const handleApprovePaidLeaveRequestRouter: Router = Router();

handleApprovePaidLeaveRequestRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload: IUpdateApprovePaidLeave = {
            ...req.body,
            leader_id: req?.user?.id
        }
        if(
            !payload?.id ||
            typeof payload?.is_approve !== 'boolean' ||
            !payload?.leader_id
        ){
            const missingFields = [
                (!payload?.id || payload?.id.trim() === '') && 'id',
                (!payload?.leader_id || payload?.leader_id.trim() === '') && 'leader_id',
                typeof payload?.is_approve !== 'boolean' && 'is_approve'
            ]
            .filter(Boolean)
            .join(', ')

            return errorResponse(res, 400, `bad request with missing field: ${missingFields}`)
        }

        const update_result = await update_approve_leave_request_controller(payload);
        if(!update_result?.success){
            return errorResponse(res, 200, `${update_result?.message}`)
        }
        return successResponse(res, 202)
    } catch (error: any) {
        return errorResponse(res, 500, `server error: ${error?.message}`)
    }
})

export default handleApprovePaidLeaveRequestRouter;
