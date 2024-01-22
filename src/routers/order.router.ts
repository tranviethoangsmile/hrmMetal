import { Router, Request, Response } from 'express';
import {
    create,
    find_all_order,
    delete_order,
} from '../controllers/order.controller';
import { timeOrderLimit } from '../middlewares/timeOrderLimit.middleware';
import { very_token_order } from '../middlewares/veryTokenOrder.middleware';
import orderRouterModule from './moduleOrderRouter/order.router';
import addPosition from '../middlewares/addPosition.middleware';

const orderRouter = Router();

orderRouter.post(
    '/',
    very_token_order,
    timeOrderLimit,
    addPosition,
    async (req: Request, res: Response) => {
        try {
            const order_data: Object | null = req.body;
            console.log(order_data);
            if (order_data && Object.keys(order_data).length !== 0) {
                const new_order = await create(order_data);
                if (new_order?.success) {
                    res.status(201).send({
                        success: true,
                        data: new_order?.data,
                    });
                } else {
                    res.status(200).send({
                        success: false,
                        message: new_order?.message,
                    });
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: 'data not empty',
                });
            }
        } catch (error: any) {
            res.status(500).json({
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
            res.status(201).send({
                success: true,
                data: orders?.data,
            });
        } else {
            res.status(200).send({
                success: false,
                message: orders?.message,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

orderRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const order_id: string | null = req.params.id;
        if (order_id != null) {
            const order = await delete_order(order_id);
            if (order.success) {
                res.status(201).send({
                    success: true,
                    message: order?.message,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: order?.message,
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'id not empty',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: 'server error: ' + error?.message,
        });
    }
});

orderRouter.use('/user', orderRouterModule);

export default orderRouter;
