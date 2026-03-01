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
        const id: string | undefined = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const orders = await search_order_of_user(id);
        if(!orders?.success) {
            return errorResponse(res, 200, orders?.message || 'Failed to search orders');
        }
        return successResponse(res, 202, orders?.data);

    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

orderRouterModule.put('/', async (req: Request, res: Response) => {
    try {
        const order_info: checkin_picked_order = req.body;
        if(!order_info.date || !order_info.user_id) {
            const missingFields = [
                !order_info.date && 'date',
                !order_info.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing required ${missingFields}`);
        }
        const result = await check_picked_order(order_info);
        if(!result?.success) {
            return errorResponse(res, 200, result?.message || 'Failed to pick order');
        }
        return successResponse(res, 202);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default orderRouterModule;
