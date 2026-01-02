import { Router, Request, Response } from 'express';
import { create_plan_production_controller } from '../../../controllers';
import { create_plan_production } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';
const createPlanProductionRouter: Router = Router();

createPlanProductionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_plan_production = req.body;
        if (
            !field ||
            !field.date.trim() ||
            !field.department_id.trim() ||
            field.operation_time === undefined ||
            !field.position.trim() ||
            !field.product.trim() ||
            field.quantity < 0 ||
            field.operation_time < 0 ||
            !field.work_shift.trim() ||
            !field.production_line.trim()
        ) {
            const missingFields = [
                !field.date.trim() && 'date',
                !field.department_id.trim() && 'department_id',
                field.operation_time === undefined && 'operation_time',
                !field.position.trim() && 'position',
                !field.product.trim() && 'product',
                field.quantity < 0 && 'quantity',
                field.operation_time < 0 && 'operation_time',
                !field.work_shift.trim() && 'work_shift',
                !field.production_line.trim() && 'production_line',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing required ${missingFields}`);
        }
        const plan_production = await create_plan_production_controller({
            ...field,
        });
        if (!plan_production?.success) {
            return errorResponse(res, 400, plan_production?.message || 'Failed to create plan production');
        }
        return successResponse(res, 201, plan_production?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default createPlanProductionRouter;
