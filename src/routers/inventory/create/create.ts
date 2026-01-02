import { Router, Request, Response } from 'express';
import { create_inventory_controller } from '../../../controllers';
import { create_inventory } from '../../../interfaces/inventory/inventory.interface';
import { delCache } from '../../../utils';
import { errorResponse, successResponse } from '../../../helpers';
const createRouter: Router = Router();
createRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_inventory = req.body;
        if (
            !field ||
            !field.product ||
            !field.quantity ||
            !field.department_id
        ) {
            const missingFields = [
                !field.product && 'product',
                !field.quantity && 'quantity',
                !field.department_id && 'department_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        } else {
            const KEY_CACHE = `all_inventory`;
            const inventory = await create_inventory_controller(field);
            if (inventory?.success) {
                await delCache(KEY_CACHE);
                return successResponse(res, 201, inventory?.data);
            } else {
                return errorResponse(res, 400, inventory?.message || 'Failed to create inventory');
            }
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createRouter;
