import { Request, Response, Router } from 'express';
import { search_plan_production_by_id_controller } from '../../../controllers';

const searchByIdPlanProductionRouter: Router = Router();

searchByIdPlanProductionRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.body.id;
            if (id === undefined) {
                return res
                    .status(400)
                    .json({ success: false, message: 'id is required' });
            }
            const planProduction =
                await search_plan_production_by_id_controller(id);
            if (!planProduction?.success) {
                return res.status(200).json({
                    success: false,
                    message: planProduction?.message,
                });
            }
            return res.status(202).json({
                success: true,
                data: planProduction?.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server: ${error?.message}`,
            });
        }
    },
);

export default searchByIdPlanProductionRouter;
