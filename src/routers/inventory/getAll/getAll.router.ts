import { Router, Request, Response } from 'express';
import { get_all_inventory_controller } from '../../../controllers';
import { setCache, getCache, delCache } from '../../../utils';
import { errorResponse, successResponse } from '../../../helpers';

const getAllRouter: Router = Router();

getAllRouter.post('/', async (req: Request, res: Response) => {
    try {
        const KEY_CACHE = `all_inventory`;
        const inventory_value = await getCache(KEY_CACHE);
        if (inventory_value) {
            return successResponse(res, 200, JSON.parse(inventory_value));
        }
        const inventorys = await get_all_inventory_controller();
        if (inventorys?.success) {
            await setCache(KEY_CACHE, JSON.stringify(inventorys?.data), 86400);
            return successResponse(res, 200, inventorys?.data);
        } else {
            return errorResponse(res, 400, inventorys?.message || 'Failed to get inventory');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default getAllRouter;
