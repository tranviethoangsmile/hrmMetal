import { Request, Response, Router } from 'express';
import { getDepartmentById } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getDepByIdRouter: Router = Router();

getDepByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { id }: { id: string } = req.body;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const department = await getDepartmentById(id);
        if (department?.success) {
            return successResponse(res, 200, department?.data);
        } else {
            return errorResponse(res, 404, department?.message || 'Department not found');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default getDepByIdRouter;
