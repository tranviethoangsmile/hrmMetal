import { Request, Response, Router } from 'express';
import { find_group_member_of_user_controller } from '../../../controllers';
import { validation_id } from '../../../validates';
import { errorResponse, successResponse } from '../../../helpers';

const getGroupMemberRouter: Router = Router();

getGroupMemberRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user_id: string | undefined = req.body.user_id;

        if (typeof user_id !== 'string') {
            return errorResponse(res, 400, 'Invalid user_id');
        }
        const isValid = validation_id(user_id);
        if (isValid?.error) {
            return errorResponse(res, 400, isValid?.error?.message || 'Invalid user_id');
        }
        const group_members = await find_group_member_of_user_controller(user_id);
        if (!group_members?.success) {
            return errorResponse(res, 400, group_members?.message || 'Failed to get group members');
        }
        return successResponse(res, 200, group_members?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getGroupMemberRouter;
