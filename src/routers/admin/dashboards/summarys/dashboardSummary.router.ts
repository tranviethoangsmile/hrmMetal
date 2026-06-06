import { Router, Request, Response } from "express";
import { adminDashboardSummaryController } from "../../../../controllers";
import { successResponse, errorResponse } from "../../../../helpers";
const adminSummaryRouter: Router = Router()

adminSummaryRouter.post('/', async (req: Request, res: Response) => {
    try {
        const position: string | undefined = req.user?.position
        const date: string | undefined = req.body.date
        if(position == undefined || date == undefined){
            const missingFields = [
                !position && 'position',
                !date && 'date',
            ]
            .filter(Boolean)
            .join(', ');
            return errorResponse(res, 400, `Missing required ${missingFields}`);
        }
        const adminSummarys = await adminDashboardSummaryController(position, date);
        if(!adminSummarys?.success){
            return errorResponse(res, 203, `${adminSummarys?.message}`)
        }
        return successResponse(res, 202, adminSummarys?.data)
    } catch (error: any) {
        return errorResponse(res, 500, `serrver error: ${error?.message}`)
    }
})

export default adminSummaryRouter;