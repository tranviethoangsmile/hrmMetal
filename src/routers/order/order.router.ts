import { Router, Request, Response } from 'express';
import {
    create_order_controller,
    find_all_order,
    delete_order,
} from '../../controllers';
import {
    addPosition,
    very_token_order,
    timeOrderLimit,
} from '../../middlewares';
import orderRouterModule from './moduleOrderRouter/order.router';
import search_order_router from './moduleOrderRouter/searchOrderWithField.router';
import { errorResponse, successResponse } from '../../helpers';
import { create_order } from '../../interfaces';

const orderRouter: Router = Router();

orderRouter.post(
    '/',
    very_token_order,
    timeOrderLimit,
    addPosition,
    async (req: Request, res: Response) => {
        try {
            const order_data: create_order = req.body;
            if(!order_data.date || !order_data.dayOrNight || !order_data.user_id || !order_data.position) {
                const missingFields = [
                    !order_data.date && 'date',
                    !order_data.dayOrNight && 'dayOrNight',
                    !order_data.user_id && 'user_id',
                    !order_data.position && 'position',
                ]
                .filter(Boolean)
                .join(', ');
                return errorResponse(res, 400, `Missing required ${missingFields}`);
            }
            const new_order = await create_order_controller(order_data);
            if(!new_order?.success) {
                return errorResponse(res, 200, new_order?.message || 'Failed to create order');
            }
            return successResponse(res, 201, new_order?.data);
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
