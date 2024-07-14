import { Request, Response, Router } from 'express';
import { update_plan_production_controller } from '../../../controllers';
import { update_plan_production } from '../../../interfaces';

const updatePlanProductionRouter: Router = Router();

updatePlanProductionRouter.put('/', async (req: Request, res: Response) => {
    try {
        const field: update_plan_production = req.body;
        if (!field || !field.id) {
            return res.status(400).json({ message: 'Missing field id' });
        }
        const result = await update_plan_production_controller(field);
        if (!result?.success) {
            return res
                .status(200)
                .json({ success: true, message: result?.message });
        }
        return res.status(202).json({ success: true });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error.message}`,
        });
    }
});
export default updatePlanProductionRouter;
