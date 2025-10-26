import { Router, Request, Response } from 'express';
import { create_inventory_controller } from '../../../controllers';
import { create_inventory } from '../../../interfaces/inventory/inventory.interface';
import { delCache } from '../../../utils';
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
            return res.status(400).json({
                success: false,
                message: `Invalid input: Missing required ${missingFields}`,
            });
        } else {
            const KEY_CACHE = `all_inventory`;
            const inventory = await create_inventory_controller(field);
            if (inventory?.success) {
                await delCache(KEY_CACHE);
                return res.status(201).json({
                    success: true,
                    data: inventory?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: inventory?.message,
                });
            }
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `${error?.message} server error`,
        });
    }
});

export default createRouter;
