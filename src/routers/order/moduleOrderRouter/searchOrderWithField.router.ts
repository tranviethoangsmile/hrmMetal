import { Router, Request, Response } from 'express';
const search_order_router: Router = Router();
import { search_orders } from '../../../controllers/order/order.controller';
import { errorResponse, successResponse } from '../../../helpers';

search_order_router.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const order_list = await search_orders({ ...field });
            if (order_list.success) {
                return successResponse(res, 200, order_list?.data);
            } else {
                return errorResponse(res, 400, order_list?.message || 'Failed to search orders');
            }
        } else {
            return errorResponse(res, 400, 'Missing parameters: data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default search_order_router;
