import { Request, Response, Router } from 'express';
import { getUserForLeaveFeatureControll } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getUserWithDepartmentId: Router = Router();

getUserWithDepartmentId.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.body.department_id;
        if(id === null) {
            return errorResponse(res, 400,  'department_id is required')
        }
        const listUser = await getUserForLeaveFeatureControll(id);
        if(!listUser?.success){
            return errorResponse(res, 200, listUser?.message || 'Failed to get users')
        }
        return successResponse(res, 202, listUser?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getUserWithDepartmentId;
