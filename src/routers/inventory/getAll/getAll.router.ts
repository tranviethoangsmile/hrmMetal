import { Router, Request, Response } from 'express';
import { get_all_inventory_controller } from '../../../controllers/inventory/inventory.controller';

const getAllRouter: Router = Router();
getAllRouter.post('/', async (req: Request, res: Response) => {
    try {
        const inventorys = await get_all_inventory_controller();
        if (inventorys?.success) {
            return res.status(202).json({
                success: true,
                data: inventorys?.data,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: inventorys?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `${error.message} server error`,
        });
    }
});
export default getAllRouter;
