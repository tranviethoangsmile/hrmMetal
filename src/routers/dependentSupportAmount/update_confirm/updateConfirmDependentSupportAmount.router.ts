import { Router, Request, Response } from "express";
import { update_confirm_dependent_support_amount_controller } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";
import { authAdminRole } from "../../../middlewares";
const updateConfirmDependentSupportAmountRouter: Router = Router();

updateConfirmDependentSupportAmountRouter.post('/',authAdminRole, async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if(!id){
            return errorResponse(res, 400, `Invalid input: Missing required id`)
        }
        const result = await update_confirm_dependent_support_amount_controller(id);
        if(!result?.success){
            return errorResponse(res, 200, `${result?.message}`)
        }
        return successResponse(res, 202)
        
    } catch (error: any) {
        return errorResponse(res, 500, `${error?.message}`|| 'Internal server error')
    }
})

export default updateConfirmDependentSupportAmountRouter;