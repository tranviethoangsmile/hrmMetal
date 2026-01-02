import { Request, Response, Router } from 'express';
import { update_plan_production_controller } from '../../../controllers';
import { update_plan_production } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const updatePlanProductionRouter: Router = Router();

updatePlanProductionRouter.put('/', async (req: Request, res: Response) => {
    try {
        const field: update_plan_production = req.body;
        if (!field || !field.id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await update_plan_production_controller(field);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to update plan production');
        }
        return successResponse(res, 200, undefined, 'Plan production updated successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default updatePlanProductionRouter;
