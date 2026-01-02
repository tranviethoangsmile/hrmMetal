import { Router, Request, Response } from 'express';
import {
    search_order_of_user,
    check_picked_order,
} from '../../../controllers/order/order.controller';
import { checkin_picked_order } from '../../../interfaces/order/order.interface';
import { errorResponse, successResponse } from '../../../helpers';

const orderRouterModule = Router();

orderRouterModule.post('/', async (req: Request, res: Response) => {
    try {
        const id: Object | null = req.body;
        if (id != null) {
            const orders = await search_order_of_user(id);
            if (orders?.success) {
                return successResponse(res, 200, orders?.data);
            } else {
                return errorResponse(res, 400, orders?.message || 'Failed to search orders');
            }
        } else {
            return errorResponse(res, 400, 'id is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

orderRouterModule.put('/', async (req: Request, res: Response) => {
    try {
        const order_info: checkin_picked_order | null = req.body;
        if (order_info !== null) {
            const result = await check_picked_order(order_info);
            if (result.success) {
                return successResponse(res, 200, undefined, 'Order picked successfully');
            } else {
                return errorResponse(res, 400, result?.message || 'Failed to pick order');
            }
        } else {
            return errorResponse(res, 400, 'order info is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default orderRouterModule;
