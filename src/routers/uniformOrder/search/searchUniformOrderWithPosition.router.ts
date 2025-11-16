import { Request, Response, Router } from 'express';
import { search_uniform_order_with_position_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const searchUniOrderWithPositionRouter: Router = Router();

searchUniOrderWithPositionRouter.post(
    '/withposition',
    async (req: Request, res: Response) => {
        try {
            const position: string | undefined = req.body.position;
            if (!position) {
                return errorResponse(res, 400, 'Position is required');
            }
            const uniformOrders = await search_uniform_order_with_position_controller(position);
            if (!uniformOrders?.success) {
                return errorResponse(res, 400, uniformOrders?.message || 'Failed to search uniform orders');
            }
            return successResponse(res, 200, uniformOrders?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default searchUniOrderWithPositionRouter;
