import { Router, Request, Response } from "express";
import { update_confirm_from_admin_paid_leave_request_controller } from "../../../../controllers";
import { successResponse, errorResponse } from "../../../../helpers";
import { IUpdatePaidLeave } from "../../../../interfaces";
const isConfirmPaidLeaveFromAdmin: Router = Router();


isConfirmPaidLeaveFromAdmin.post('/paid-leave-confirm', async (req: Request, res: Response) => {
    try {
        const data: IUpdatePaidLeave = req.body

        
    } catch (error: any) {
        return errorResponse(res, 500, `server error: ${error?.message}`)
    }
})

export default isConfirmPaidLeaveFromAdmin;