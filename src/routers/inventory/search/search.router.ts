import { Router, Request, Response } from 'express';
import { search_inventory_with_name_controller } from '../../../controllers/inventory/inventory.controller';
import { search_with_name } from '../../../interfaces/inventory/inventory.interface';
const searchRouter: Router = Router();

searchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_with_name = req.body;
        if (!field.department_id && !field.product) {
            return res.status(400).json({
                success: false,
                message: 'Bad request',
            });
        } else {
            const inventorys = await search_inventory_with_name_controller(
                field,
            );
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
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `${error.message} server error`,
        });
    }
});
export default searchRouter;
