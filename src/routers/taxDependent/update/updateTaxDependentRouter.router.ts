import { Request, Response, Router } from "express";
import { updateTaxDependentWithIdController } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";
import { IUpdateTaxDependent } from "../../../interfaces";
import { create_media_path } from "../../../middlewares";
const updateTaxDependentRouter: Router = Router();

updateTaxDependentRouter.put('/', create_media_path, async (req: Request, res: Response) => {
    try {
        const updateValue: IUpdateTaxDependent = req.body;
        if (!updateValue || !updateValue.id || !updateValue.user_id) {
            const missingFields = [
                !updateValue?.id && 'id',
                !updateValue?.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const result = await updateTaxDependentWithIdController(updateValue);
        if (!result?.success) {
            return errorResponse(res, 200, result?.message || 'Failed to update tax dependent');
        }
        return successResponse(res, 202, undefined, 'Tax dependent updated successfully');
    }
    catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default updateTaxDependentRouter;