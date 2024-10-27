import { Request, Response, Router } from 'express';
import { search_uniform_order_with_position_controller } from '../../../controllers';

const searchUniOrderWithPositionRouter: Router = Router();

searchUniOrderWithPositionRouter.post(
    '/withposition',
    async (req: Request, res: Response) => {
        try {
            const position: string | undefined = req.body.position;
            if (!position) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Position is required' });
            }
            const uniformOrders =
                await search_uniform_order_with_position_controller(position);
            if (!uniformOrders?.success) {
                return res.status(200).json({
                    success: false,
                    message: `${uniformOrders?.message}`,
                });
            }
            return res.status(202).json({
                success: true,
                data: uniformOrders?.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server -- ${error.message}`,
            });
        }
    },
);

export default searchUniOrderWithPositionRouter;
