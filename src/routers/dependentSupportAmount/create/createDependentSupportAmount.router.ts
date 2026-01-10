import { Request, Response, Router } from "express";
import { create_dependent_support_amount_controller } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";
import { ICreateDependentSupportAmount } from "@/interfaces/dependentSupportAmount/IDependentSupportAmount.interface";
const createDependentSupportAmountRouter: Router = Router();

createDependentSupportAmountRouter.post('/', async (req: Request, res: Response) => {
    try {
        const createDependenSupportAmount: ICreateDependentSupportAmount = req.body;
        if(!createDependenSupportAmount || !createDependenSupportAmount?.tax_dependent_id || !createDependenSupportAmount?.year){
            const missingFields = [
                !createDependenSupportAmount?.tax_dependent_id && 'tax_dependent_id',
                !createDependenSupportAmount?.year && 'year'
            ].filter(Boolean).join(', ')
            return errorResponse(res,400,`Invalid input: Missing required ${missingFields}`)
        }

        const dependentSupportAmount = await create_dependent_support_amount_controller(createDependenSupportAmount)
        if(!dependentSupportAmount?.success){
           return errorResponse(res, 200, `${dependentSupportAmount?.message}`)
        }
      return successResponse(res, 201, dependentSupportAmount?.data)
    } catch (error: any) {
       return errorResponse(res,500,error?.message|| 'Internal server error')
    }
})

export default createDependentSupportAmountRouter;