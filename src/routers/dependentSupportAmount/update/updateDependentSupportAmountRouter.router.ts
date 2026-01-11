import { Router, Request, Response } from "express";
import { update_dependent_support_amount_controller } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";
import { IUpdateDependentSupportAmount } from "@/interfaces";

const updateDependentSupportAmountRouter: Router = Router();

updateDependentSupportAmountRouter.post('/', async (req: Request, res: Response) =>{
    try {
        const updateValue: IUpdateDependentSupportAmount = req.body;
        if(!updateValue || !updateValue?.user_id || !updateValue?.id) {
            const missingFields = [
                !updateValue?.user_id && 'user_id',
                !updateValue?.id && 'id'
            ].filter(Boolean).join(', ')
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`)
        }
        const result = await update_dependent_support_amount_controller(updateValue);
        if(!result?.success){
            return errorResponse(res, 200, `${result?.message}`)
        }
        return successResponse(res, 202)
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error')
    }
})

export default updateDependentSupportAmountRouter;