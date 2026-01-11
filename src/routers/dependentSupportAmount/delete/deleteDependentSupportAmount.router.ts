import { Router, Request, Response } from "express";
import { delete_dependent_support_amount_controller } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";
import { IDeleteDependentSupportAmount } from "../../../interfaces";
const deleteDependentSupportAmountRouter: Router = Router();

deleteDependentSupportAmountRouter.post('/', async (req: Request, res: Response) => {
    try {
        const deleteValue: IDeleteDependentSupportAmount = req.body;
        if(!deleteValue || !deleteValue?.id || !deleteValue?.user_id){
            const missingFields = [
                !deleteValue?.id && 'id',
                !deleteValue?.user_id && 'user_id'
            ].filter(Boolean).join(', ')
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`)
        }
        const result = await delete_dependent_support_amount_controller(deleteValue)
        if(!result?.success){
            return errorResponse(res, 200, `${result?.message}`)
        }
        return successResponse(res, 202)
    } catch (error: any) {
        return errorResponse(res, 500, `${error?.message}`|| 'Internal server error')
    }
})

export default deleteDependentSupportAmountRouter;