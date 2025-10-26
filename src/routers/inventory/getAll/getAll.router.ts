import { Router, Request, Response } from 'express';
import { get_all_inventory_controller } from '../../../controllers';
import { setCache, getCache, delCache } from '../../../utils';
const getAllRouter: Router = Router();
getAllRouter.post('/', async (req: Request, res: Response) => {
    try {
        const KEY_CACHE = `all_inventory`;
        const inventory_value = await getCache(KEY_CACHE);
        if (inventory_value) {
            return res.status(202).json({
                success: true,
                data: JSON.parse(inventory_value),
            });
        }
        const inventorys = await get_all_inventory_controller();
        if (inventorys?.success) {
            await setCache(KEY_CACHE, JSON.stringify(inventorys?.data), 86400);
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
