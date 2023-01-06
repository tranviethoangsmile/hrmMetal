import express, { Request, Response, Router } from 'express';
import { findByName } from '../controllers/user.controller';
import { search_orders } from '../controllers/order.controller';
const findRouter = Router();

findRouter.get('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        if (name) {
            const data = await findByName(name);
            if (!data?.error) {
                res.status(200).send(data?.data);
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error: trying get user by name ',
        };
    }
});

findRouter.post('/', async (req, res) => {
    try {
        const value = req.body;
        if (value.created_at != null) {
            const new_value = new Date(Date.parse(value.created_at));
            const data = {
                ...value,
                created_at: new_value,
            };
            const orders = await search_orders(data);
            if (orders?.success) {
                res.status(200).json(search_orders);
            } else {
                res.status(400).json(orders);
            }
        }else {
            const orders = await search_orders(value);
            if (orders?.success) {
                res.status(200).json(orders);
            } else {
                res.status(400).json(orders);
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'server error',
        });
    }
});

export default findRouter;
