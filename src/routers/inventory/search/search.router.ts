import { Router, Request, Response } from 'express';
import { search_inventory_with_name_controller } from '../../../controllers';
import { search_inventory_with_name } from '../../../interfaces';
import { setCache, getCache, delCache } from '../../../utils';
const searchRouter: Router = Router();

searchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_inventory_with_name = req.body;
        if (!field.department_id && !field.product) {
            return res.status(400).json({
                success: false,
                message: 'Bad request',
            });
        }
        const KEY_CACHE = `inventory_search_${JSON.stringify(field)}`;
        const inventory_value = await getCache(KEY_CACHE);
        if (inventory_value) {
            return res.status(202).json({
                success: true,
                data: JSON.parse(inventory_value),
            });
        }
        const inventorys = await search_inventory_with_name_controller(
            field,
        );
        if(!inventorys?.success){
            return res.status(200).json({
                success: false,
                message: inventorys?.message,
            });
        }
        await setCache(KEY_CACHE, JSON.stringify(inventorys?.data), 86400);
        return res.status(202).json({
            success: true,
            data: inventorys?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `${error.message} server error`,
        });
    }
});
export default searchRouter;
