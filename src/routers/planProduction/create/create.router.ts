import { Router, Request, Response } from 'express';
import { create_plan_production_controller } from '../../../controllers';
import { create_plan_production } from '../../../interfaces';
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
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }
        const plan_production = await create_plan_production_controller({
            ...field,
        });
        if (!plan_production?.success) {
            return res.status(200).json({
                success: false,
                message: plan_production?.message,
            });
        }
        return res.status(201).json({
            success: true,
            data: plan_production?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error?.message}`,
        });
    }
});
export default createPlanProductionRouter;
