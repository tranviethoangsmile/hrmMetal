import { Request, Response, Router } from 'express';
import { getUserForLeaveFeatureControll } from '../../../controllers/user/user.controller';
import { errorResponse, successResponse } from '../../../helpers';

const getUserWithDepartmentId: Router = Router();

getUserWithDepartmentId.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.body.department_id;
        if (id != null) {
            const listUser = await getUserForLeaveFeatureControll(id);
            if (listUser?.success) {
                return successResponse(res, 200, listUser?.data);
            } else {
                return errorResponse(res, 400, listUser?.message || 'Failed to get users');
            }
        } else {
            return errorResponse(res, 400, 'department_id is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getUserWithDepartmentId;
