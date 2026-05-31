import { Router, Request, Response } from "express";
import { adminDashboardSummaryController } from "../../../../controllers";
import { successResponse, errorResponse } from "../../../../helpers";
const adminSummaryRouter: Router = Router()

adminSummaryRouter.get('/summarys', async (req: Request, res: Response) => {
    try {
        const position: string | undefined= req.user?.position
        if(position == undefined){
            return errorResponse(res, 400, `bad request`)
        }
        const adminSummarys = await adminDashboardSummaryController(position);
        if(!adminSummarys?.success){
            return errorResponse(res, 203, `${adminSummarys?.message}`)
        }
        return successResponse(res, 202, adminSummarys?.data)
    } catch (error: any) {
        return errorResponse(res, 500, `serrver error: ${error?.message}`)
    }
})

export default adminSummaryRouter;