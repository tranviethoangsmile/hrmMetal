import { Router, Request, Response } from 'express';
import { search_order_of_user } from '../../controllers/order.controller';

const orderRouterModule = Router();

orderRouterModule.post('/', async (req: Request, res: Response) => {
    try {
        const id: Object | null = req.body;
        if (id != null) {
            const orders = await search_order_of_user(id);
            if (orders?.success) {
                res.status(201).send({
                    success: true,
                    data: orders?.data,
                });
            } else {
                res.status(200).send({
                    success: false,
                    data: orders?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error',
        });
    }
});

export default orderRouterModule;
