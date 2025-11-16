import { Request, Response, Router } from 'express';
import { search_uniform_order_with_user_id_controller } from '../../../controllers';
import { search_processing_uniform_order } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const searchUniOrderWithUserIdRouter: Router = Router();

searchUniOrderWithUserIdRouter.post(
    '/withuserid',
    async (req: Request, res: Response) => {
        try {
            const field: search_processing_uniform_order | undefined = req.body;
            if (!field || !field.order_status || !field.user_id) {
                return errorResponse(res, 400, 'order_status and user_id are required');
            }
            const uniformOrders = await search_uniform_order_with_user_id_controller(field);
            if (!uniformOrders?.success) {
                return errorResponse(res, 400, uniformOrders?.message || 'Failed to search uniform orders');
            }
            return successResponse(res, 200, uniformOrders?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);
export default searchUniOrderWithUserIdRouter;
