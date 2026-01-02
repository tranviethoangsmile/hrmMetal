import { Request, Response, Router } from 'express';
import { createDep } from '../../../controllers';
import { CREATE_DEPARETMENT } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const createDepRouter: Router = Router();

createDepRouter.post('/', async (req: Request, res: Response) => {
    try {
        const value: CREATE_DEPARETMENT = req.body;
        if (!value || !value.name) {
            return errorResponse(res, 400, 'name is required');
        }
        const department = await createDep(value);
        if (!department?.success) {
            return errorResponse(res, 400, department?.message || 'Failed to create department');
        }
        return successResponse(res, 201, department?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createDepRouter;
