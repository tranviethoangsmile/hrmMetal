import { Router, Request, Response } from 'express';
import { search_inventory_with_name_controller } from '../../../controllers';
import { search_inventory_with_name } from '../../../interfaces';
import { setCache, getCache, delCache } from '../../../utils';
import { errorResponse, successResponse } from '../../../helpers';

const searchRouter: Router = Router();

searchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_inventory_with_name = req.body;
        if (!field.department_id && !field.product) {
            return errorResponse(res, 400, 'department_id or product is required');
        }
        const KEY_CACHE = `inventory_search_${JSON.stringify(field)}`;
        const inventory_value = await getCache(KEY_CACHE);
        if (inventory_value) {
            return successResponse(res, 200, JSON.parse(inventory_value));
        }
        const inventorys = await search_inventory_with_name_controller(field);
        if (!inventorys?.success) {
            return errorResponse(res, 400, inventorys?.message || 'Failed to search inventory');
        }
        await setCache(KEY_CACHE, JSON.stringify(inventorys?.data), 86400);
        return successResponse(res, 200, inventorys?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default searchRouter;
