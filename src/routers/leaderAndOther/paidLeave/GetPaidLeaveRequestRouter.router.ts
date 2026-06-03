import { Router, Request, Response } from "express";
import { get_all_paid_leave_controller } from "../../../controllers";
import { successResponse, errorResponse } from "../../../helpers";
const GetPaidLeaveRequestForLeaderAndOtherRouter: Router = Router();

GetPaidLeaveRequestForLeaderAndOtherRouter.get('/', async (req: Request, res: Response) => {
    try {
        const leader_id: string = req.user?.id as string
        if(!leader_id){
            return errorResponse(res, 400, 'Leader id is required')
        }
        const paid_leaves = await get_all_paid_leave_controller(leader_id)
        if(!paid_leaves?.success){
            return errorResponse(res, 200, paid_leaves?.message)
        }
        return successResponse(res, 202, paid_leaves?.data)
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error')
    }
})
export default GetPaidLeaveRequestForLeaderAndOtherRouter;