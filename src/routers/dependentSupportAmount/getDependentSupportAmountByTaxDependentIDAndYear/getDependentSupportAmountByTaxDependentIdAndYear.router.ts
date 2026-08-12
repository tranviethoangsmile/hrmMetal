import { Router, Request, Response } from "express";
import { get_dependent_support_amount_by_tax_dependent_id_and_year_controller } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";
import { IGetDependentSupportAmountByTaxDependentIdAndYear } from "../../../interfaces";
const getDependentSupportAmountByTaxDependentIdAndYearRouter = Router();

getDependentSupportAmountByTaxDependentIdAndYearRouter.post('/', async (req: Request, res: Response) => {
    try {
        const fields: IGetDependentSupportAmountByTaxDependentIdAndYear = req.body;
        if(!fields?.tax_dependent_id || !fields?.year) {
            const missingFields = [
                !fields?.tax_dependent_id && 'tax_dependent_id',
                !fields?.year && 'year'
            ].filter(Boolean).join(', ')
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const result = await get_dependent_support_amount_by_tax_dependent_id_and_year_controller(fields);
        if(!result?.success) {
            return errorResponse(res, 200, result?.message || 'Failed to get dependent support amount');
        }
        return successResponse(res, 202, result?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getDependentSupportAmountByTaxDependentIdAndYearRouter;