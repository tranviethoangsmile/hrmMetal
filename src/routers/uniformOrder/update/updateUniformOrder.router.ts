import { Request, Response, Router } from 'express';
import { update_uniform_order_controller } from '../../../controllers';
import { update_uniform_order } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const updateUniformOrderRouter: Router = Router();

updateUniformOrderRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_uniform_order | undefined = req.body;
        if (!field || !field.id) {
            return errorResponse(res, 400, 'id is required');
        }

        const result = await update_uniform_order_controller({
            ...field,
        });

        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to update uniform order');
        }
        return successResponse(res, 200, undefined, 'Uniform order updated successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default updateUniformOrderRouter;
