import { Request, Response, Router } from 'express';
import { findByName } from '../../controllers/user/user.controller';
import { search_orders } from '../../controllers/order/order.controller';
import { errorResponse, successResponse } from '../../helpers';

const findRouter: Router = Router();

findRouter.get('/:name', async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        if (name) {
            const data = await findByName(name);
            if (data?.success) {
                return successResponse(res, 200, data?.data);
            } else {
                return errorResponse(res, 400, data?.message || 'Failed to find user');
            }
        } else {
            return errorResponse(res, 400, 'name is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
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
                return successResponse(res, 200, orders?.data);
            } else {
                return errorResponse(res, 400, orders?.message || 'Failed to search orders');
            }
        } else {
            return errorResponse(res, 400, 'value is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default findRouter;
