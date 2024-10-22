import { Request, Response, Router } from 'express';
import { get_uniform_order_detail_by_id_controller } from '../../../controllers';
const getUniformOrderDetailRouter: Router = Router();
getUniformOrderDetailRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: `id is required`,
            });
        }
        const uniformOrderDetail =
            await get_uniform_order_detail_by_id_controller(id);
        if (!uniformOrderDetail?.success) {
            return res.status(200).json({
                success: false,
                message: `${uniformOrderDetail?.message}`,
            });
        }
        return res.status(202).json({
            success: true,
            data: uniformOrderDetail?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server -- ${error.message}`,
        });
    }
});
export default getUniformOrderDetailRouter;
