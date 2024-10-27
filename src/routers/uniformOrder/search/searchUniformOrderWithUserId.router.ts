import { Request, Response, Router } from 'express';
import { search_uniform_order_with_user_id_controller } from '../../../controllers';
import { search_processing_uniform_order } from '../../../interfaces';

const searchUniOrderWithUserIdRouter: Router = Router();
searchUniOrderWithUserIdRouter.post(
    '/withuserid',
    async (req: Request, res: Response) => {
        try {
            const field: search_processing_uniform_order | undefined = req.body;
            if (!field || !field.order_status || !field.user_id) {
                return res
                    .status(400)
                    .json({ success: false, message: 'field is required' });
            }
            const uniformOrders =
                await search_uniform_order_with_user_id_controller(field);
            if (!uniformOrders?.success) {
                return res.status(200).json({
                    success: false,
                    message: `${uniformOrders?.message}`,
                });
            }
            return res
                .status(202)
                .json({ success: true, data: uniformOrders?.data });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server -- ${error.message}`,
            });
        }
    },
);
export default searchUniOrderWithUserIdRouter;
