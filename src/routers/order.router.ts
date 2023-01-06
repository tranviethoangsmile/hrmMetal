import { Router, Request, Response, NextFunction } from 'express';
import { create, find_all_order} from '../controllers/order.controller';
import { timeOrderLimit } from '../middlewares/timeOrderLimit.middleware'

const orderRouter = Router();

orderRouter.post('/', timeOrderLimit ,async (req: Request, res: Response) => {
    try {
        const order_data = req.body;
        const new_order = await create(order_data);
        if (new_order?.success) {
            res.status(201).json(new_order);
        } else {
            res.status(400).json(new_order);
        }
    } catch (error) {
        res.status(500).json({
            message: 'server error',
        });
    }
});

orderRouter.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await find_all_order();
        if (orders?.success) {
            res.status(200).json(orders);
        } else {
            res.status(400).json(orders);
        }
    } catch (error) {
        res.status(500).json({
            message: 'server error',
        });
    }
});

// orderRouter.post('/', async (req: Request, res: Response) => {
//     try {
//         const value = req.params.value;
//         const orders = await search_orders(value);
//         if(orders?.success){
//             res.status(200).json(orders);
//         }else {
//             res.status(400).json(orders);
//         }
//     } catch (error) {
//         res.status(500).json({
//             message:'server error',
//         })
//     }
// });

export default orderRouter;
