import { Router, Request, Response } from 'express';
import {
    create,
    find_all_order,
    delete_order,
} from '../../controllers/order/order.controller';
import orderRouterModule from './moduleOrderRouter/order.router';
import {
    addPosition,
    very_token_order,
    timeOrderLimit,
} from '../../middlewares';
import search_order_router from './moduleOrderRouter/searchOrderWithField.router';
import { errorResponse, successResponse } from '../../helpers';

const orderRouter: Router = Router();

orderRouter.post(
    '/',
    very_token_order,
    timeOrderLimit,
    addPosition,
    async (req: Request, res: Response) => {
        try {
            const order_data: Object | null = req.body;
            if (order_data && Object.keys(order_data).length !== 0) {
                const new_order = await create(order_data);
                if (new_order?.success) {
                    return successResponse(res, 201, new_order?.data);
                } else {
                    return errorResponse(res, 400, new_order?.message || 'Failed to create order');
                }
            } else {
                return errorResponse(res, 400, 'data is required');
            }
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

orderRouter.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await find_all_order();
        if (orders?.success) {
            return successResponse(res, 200, orders?.data);
        } else {
            return errorResponse(res, 400, orders?.message || 'Failed to get orders');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

orderRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const order_id: string | undefined = req.params.id;
        if (!order_id) {
            return errorResponse(res, 400, 'id is required');
        }
        const order = await delete_order(order_id);
        if (order.success) {
            return successResponse(res, 200, undefined, order?.message || 'Order deleted successfully');
        } else {
            return errorResponse(res, 400, order?.message || 'Failed to delete order');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

orderRouter.use('/user', orderRouterModule);
orderRouter.use('/searchorderwithfield', search_order_router);

export default orderRouter;
