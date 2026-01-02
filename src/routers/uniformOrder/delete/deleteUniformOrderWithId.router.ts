import { Request, Response, Router } from 'express';
import { delete_uniform_order_with_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const deleteUniOrderWithIdRouter: Router = Router();

deleteUniOrderWithIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const result = await delete_uniform_order_with_id_controller(id);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to delete uniform order');
        }
        return successResponse(res, 200, undefined, 'Uniform order deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default deleteUniOrderWithIdRouter;
