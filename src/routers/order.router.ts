import { Router, Request, Response} from 'express';
import { create, find_all_order, delete_order} from '../controllers/order.controller';
import { timeOrderLimit } from '../middlewares/timeOrderLimit.middleware'
import { very_token_order } from '../middlewares/veryTokenOrder.middleware';
import orderRouterModule from './moduleOrderRouter/order.router';

const orderRouter = Router();

orderRouter.post('/', very_token_order, timeOrderLimit ,async (req: Request, res: Response) => {
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

// orderRouter.post('/:id',  async (req: Request, res: Response) => {
//    try {
//         const order_id = req.params.id;
//         const order = await delete_order(order_id);
//         if (order.success) {
//             res.status(200).send({
//                 success: true,
//             })
//         }else {
//             res.status(400).json({
//                 success: false,
//             })
//         }
    
//    } catch (error) {
//         return res.status(500).json({
//             message: 'server error',
//         })
//    }
// });

orderRouter.use('/user',orderRouterModule)


export default orderRouter;
