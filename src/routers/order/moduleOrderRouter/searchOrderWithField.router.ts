import { Router, Request, Response } from 'express';
const search_order_router: Router = Router();
import { search_orders } from '../../../controllers/order/order.controller';
search_order_router.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const order_list = await search_orders({ ...field });
            if (order_list.success) {
                res.status(201).json({
                    success: true,
                    data: order_list?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: order_list?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Missing parameters data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error ' + error?.message,
        });
    }
});
export default search_order_router;
