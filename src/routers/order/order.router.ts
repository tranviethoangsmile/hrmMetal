import { Router, Request, Response } from 'express';
import {
    create,
    find_all_order,
    delete_order,
} from '../../controllers/order/order.controller';
import { timeOrderLimit } from '../../middlewares/timeOrderLimit.middleware';
import { very_token_order } from '../../middlewares/veryTokenOrder.middleware';
import orderRouterModule from './moduleOrderRouter/order.router';
import addPosition from '../../middlewares/addPosition.middleware';
import search_order_router from './moduleOrderRouter/searchOrderWithField.router';
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
                    return res.status(201).json({
                        success: true,
                        data: new_order?.data,
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: new_order?.message,
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'data not empty',
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'server error: ' + error?.message,
            });
        }
    },
);

orderRouter.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await find_all_order();
        if (orders?.success) {
            return res.status(202).json({
                success: true,
                data: orders?.data,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: orders?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

orderRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const order_id: string | undefined = req.params.id;
        if (!order_id) {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
        const order = await delete_order(order_id);
        if (order.success) {
            return res.status(202).json({
                success: true,
                message: order?.message,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: order?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: 'server error: ' + error?.message,
        });
    }
});

orderRouter.use('/user', orderRouterModule);
orderRouter.use('/searchorderwithfield', search_order_router);

export default orderRouter;
