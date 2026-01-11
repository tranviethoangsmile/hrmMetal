import { Router, Request, Response } from "express";
import { errorResponse, successResponse } from "../../../helpers";
import { get_dependent_support_amount_controller } from "../../../controllers";

const getDependentSupportAmountRouter: Router = Router();
getDependentSupportAmountRouter.post('/', async(req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        if(!id) {
            return errorResponse(res, 400, `Invalid input: Missing required id}`)
        }
        const result = await get_dependent_support_amount_controller(id);
        if(!result?.success){
            return errorResponse(res, 200, `${result?.message}`)
        }
        return successResponse(res, 202, result?.data)
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error')
    }
})

export default getDependentSupportAmountRouter;