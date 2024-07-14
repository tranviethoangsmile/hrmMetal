import { Request, Response, Router } from 'express';
import { destroy_plan_production_cotroller } from '../../../controllers';

const destroyPlanProductionRouter: Router = Router();

destroyPlanProductionRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (id === undefined) {
            return res
                .status(400)
                .json({ success: false, message: 'id is required' });
        }
        const result = await destroy_plan_production_cotroller(id);
        if (!result?.success) {
            return res.status(200).json({
                success: false,
                message: result?.message,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
export default destroyPlanProductionRouter;
