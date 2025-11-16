import { Request, Response, Router } from 'express';
import { get_uniform_order_detail_by_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getUniformOrderDetailRouter: Router = Router();

getUniformOrderDetailRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const uniformOrderDetail = await get_uniform_order_detail_by_id_controller(id);
        if (!uniformOrderDetail?.success) {
            return errorResponse(res, 404, uniformOrderDetail?.message || 'Uniform order not found');
        }
        return successResponse(res, 200, uniformOrderDetail?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default getUniformOrderDetailRouter;
