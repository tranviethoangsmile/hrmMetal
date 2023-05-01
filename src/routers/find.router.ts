import express, { Request, Response, Router } from 'express';
import { findByName } from '../controllers/user.controller';
import { search_orders } from '../controllers/order.controller';
const findRouter = Router();

findRouter.get('/:name', async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        if (name) {
            const data = await findByName(name);
            if (!data?.success) {
                res.status(201).send({
                    success: true,
                    data: data?.data,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: data?.message,
                });
            }
        }
    } catch (error: any) {
        return {
            success: false,
            message: 'server error: ' + error?.message,
        };
    }
});

findRouter.post('/', async (req: Request, res: Response) => {
    try {
        const value = req.body;
        if (value != null) {
            if (value.created_at != null) {
                const new_value = new Date(Date.parse(value.created_at));
                value.created_at = new_value.toISOString();
            }
            const orders = await search_orders(value);

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
        } else {
            res.status(400).send({
                success: false,
                message: 'value not empty',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default findRouter;
