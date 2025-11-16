import { Request, Response, Router } from 'express';
import { departmentList } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getAllDepRouter: Router = Router();

getAllDepRouter.get('/', async (req: Request, res: Response) => {
    try {
        const departments = await departmentList();
        if (departments?.success) {
            return successResponse(res, 200, departments?.data);
        } else {
            return errorResponse(res, 400, departments?.message || 'Failed to get departments');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getAllDepRouter;
