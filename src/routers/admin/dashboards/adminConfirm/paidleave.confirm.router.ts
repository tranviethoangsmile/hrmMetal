import { Router, Request, Response } from "express";
import { update_confirm_from_admin_paid_leave_request_controller } from "../../../../controllers";
import { successResponse, errorResponse } from "../../../../helpers";
import { IUpdatePaidLeave } from "../../../../interfaces";
const isConfirmPaidLeaveFromAdmin: Router = Router();


isConfirmPaidLeaveFromAdmin.post('/paid-leave-confirm', async (req: Request, res: Response) => {
    try {
        const data: IUpdatePaidLeave = {
            ...req.body,
            admin_id: req?.user?.id
        }
        if(!data?.user_id || !data?.id || !data?.admin_id) {
            const missingFields = [
                (!data?.user_id || data?.user_id.trim() === '' )&& "user_id",
                (!data?.id || data?.id.trim() === '') && "id",
                (!data?.admin_id || data?.admin_id.trim()==='') && "admin_id"
            ]
            .filter(Boolean)
            .join(', ')
            return errorResponse(res, 400, `bad request missing: ${missingFields}`)
        }
        
        const result = await update_confirm_from_admin_paid_leave_request_controller(data)
        if(!result?.success){
            return errorResponse(res,200, `update faild with message: ${result?.message}`)
        }
        return successResponse(res, 202)
    } catch (error: any) {
        return errorResponse(res, 500, `server error: ${error?.message}`)
    }
})

export default isConfirmPaidLeaveFromAdmin;