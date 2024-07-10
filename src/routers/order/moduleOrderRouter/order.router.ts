import { Router, Request, Response } from 'express';
import {
    search_order_of_user,
    check_picked_order,
} from '../../../controllers/order/order.controller';
import { checkin_picked_order } from '../../../interfaces/order/order.interface';
const orderRouterModule = Router();

orderRouterModule.post('/', async (req: Request, res: Response) => {
    try {
        const id: Object | null = req.body;
        if (id != null) {
            const orders = await search_order_of_user(id);
            if (orders?.success) {
                return res.status(202).send({
                    success: true,
                    data: orders?.data,
                });
            } else {
                return res.status(200).send({
                    success: false,
                    data: orders?.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: 'server error ' + error?.message,
        });
    }
});
orderRouterModule.put('/', async (req: Request, res: Response) => {
    try {
        const order_info: checkin_picked_order | null = req.body;
        if (order_info !== null) {
            const result = await check_picked_order(order_info);
            if (result.success) {
                return res.status(202).send({
                    success: result?.success,
                    message: result?.message,
                });
            } else {
                return res.status(200).send({
                    success: result?.success,
                    message: result?.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'order info not empty',
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: 'server error ' + error?.message,
        });
    }
});

export default orderRouterModule;
