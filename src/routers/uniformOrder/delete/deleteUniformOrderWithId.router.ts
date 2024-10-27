import { Request, Response, Router } from 'express';
import { delete_uniform_order_with_id_controller } from '../../../controllers';
const deleteUniOrderWithIdRouter: Router = Router();
deleteUniOrderWithIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'id is required' });
        }
        const result = await delete_uniform_order_with_id_controller(id);
        if (!result?.success) {
            return res.status(200).json({
                success: false,
                message: `${result?.message}`,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server -- ${error.message}`,
        });
    }
});
export default deleteUniOrderWithIdRouter;
