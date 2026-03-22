import { Router, Request, Response } from 'express';
const search_order_router: Router = Router();
import { search_orders } from '../../../controllers';
import { search_order } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

search_order_router.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_order = req.body;
        if (!field){
            return errorResponse(res, 400, `Missing required ${JSON.stringify(field)}`);
        }
        const order_list = await search_orders(field);
        if (order_list.success) {
            return successResponse(res, 202, order_list?.data);
        } else {
            return errorResponse(res, 200, order_list?.message || 'Failed to search orders');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default search_order_router;
