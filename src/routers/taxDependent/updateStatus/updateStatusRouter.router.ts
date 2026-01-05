import { Request, Response, Router } from "express";
import { updateTaxDependentStatusWithIdController } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";
import { IUpdateTaxDependentStatus } from "../../../interfaces";
import { authAdminRole } from "../../../middlewares";
const updateStatusRouter: Router = Router();

updateStatusRouter.put('/', authAdminRole, async (req: Request, res: Response) => {
    try {
        const updateStatusValue: IUpdateTaxDependentStatus = req.body;
        if (!updateStatusValue || !updateStatusValue.id || !updateStatusValue.status) {
            const missingFields = [
                !updateStatusValue?.id && 'id',
                !updateStatusValue?.status && 'status',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const result = await updateTaxDependentStatusWithIdController(updateStatusValue);
        if (!result?.success) {
            return errorResponse(res, 200, result?.message || 'Failed to update tax dependent status');
        }
        return successResponse(res, 202, undefined, 'Tax dependent status updated successfully');
    }
    catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default updateStatusRouter;