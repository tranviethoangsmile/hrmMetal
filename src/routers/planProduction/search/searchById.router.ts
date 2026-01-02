import { Request, Response, Router } from 'express';
import { search_plan_production_by_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const searchByIdPlanProductionRouter: Router = Router();

searchByIdPlanProductionRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.body.id;
            if (id === undefined) {
                return errorResponse(res, 400, 'id is required');
            }
            const planProduction = await search_plan_production_by_id_controller(id);
            if (!planProduction?.success) {
                return errorResponse(res, 404, planProduction?.message || 'Plan production not found');
            }
            return successResponse(res, 200, planProduction?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default searchByIdPlanProductionRouter;
