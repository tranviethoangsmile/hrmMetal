import { Router, Request, Response } from 'express';
import { search_order_of_user } from '../../controllers/order.controller';

const orderRouterModule = Router();

orderRouterModule.post('/', async (req: Request, res: Response) => {
    try {
        const id = req.body;
        if (id) {
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
                message: 'data is required',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'server error',
        });
    }
});

export default orderRouterModule;
