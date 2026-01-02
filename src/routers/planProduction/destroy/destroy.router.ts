import { Request, Response, Router } from 'express';
import { destroy_plan_production_cotroller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const destroyPlanProductionRouter: Router = Router();

destroyPlanProductionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (id === undefined) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await destroy_plan_production_cotroller(id);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to delete plan production');
        }
        return successResponse(res, 200, undefined, 'Plan production deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default destroyPlanProductionRouter;
