import { Request, Response, Router } from "express";
import { getTaxDependentByUserIdController } from "../../../controllers";
import { errorResponse, successResponse } from "../../../helpers";

const getAllTaxDependentByUserIdRouter: Router = Router();

getAllTaxDependentByUserIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user_id = req.body.user_id;
        if (!user_id) {
            return errorResponse(res, 400, 'user_id is required');
        }
        const taxDependents = await getTaxDependentByUserIdController(user_id);
        if (!taxDependents?.success) {
            return errorResponse(res, 200, taxDependents?.message || 'Failed to get tax dependents');
        }
        return successResponse(res, 202, taxDependents?.data);
    }
    catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getAllTaxDependentByUserIdRouter;