import { Router, Request, Response } from 'express';
import { update_inventory_controller } from '../../../controllers/inventory/inventory.controller';
import { update_inventory } from '../../../interfaces/inventory/inventory.interface';
const updateRouter: Router = Router();
updateRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_inventory = req.body;
        if (!field || !field.product || !field.quantity) {
            return res.status(400).json({
                success: false,
                message: 'Bad request',
            });
        } else {
            const result = await update_inventory_controller(field);
            if (result?.success) {
                return res.status(202).json({
                    success: true,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: result?.message,
                });
            }
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `${error.message} server error`,
        });
    }
});
export default updateRouter;
