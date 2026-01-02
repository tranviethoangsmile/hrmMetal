import { Router, Request, Response } from 'express';
import { update_inventory_controller } from '../../../controllers/inventory/inventory.controller';
import { update_inventory } from '../../../interfaces/inventory/inventory.interface';
import { errorResponse, successResponse } from '../../../helpers';

const updateRouter: Router = Router();

updateRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_inventory = req.body;
        if (!field || !field.product || !field.quantity) {
            return errorResponse(res, 400, 'product and quantity are required');
        } else {
            const result = await update_inventory_controller(field);
            if (result?.success) {
                return successResponse(res, 200, undefined, 'Inventory updated successfully');
            } else {
                return errorResponse(res, 400, result?.message || 'Failed to update inventory');
            }
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default updateRouter;
