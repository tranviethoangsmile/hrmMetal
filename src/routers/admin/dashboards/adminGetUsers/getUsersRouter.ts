import { Router, Request, Response } from 'express';
import {
    get_all_users_of_position_for_admin_controller,
} from '../../../../controllers';
import { errorResponse, successResponse } from '../../../../helpers';

const getUsersRouter = Router();

getUsersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const position: string | undefined = req?.user?.position;

        if (!position) {
            return errorResponse(res, 400, 'Missing required position');
        }

        const adminPosition = position as string;
        const users =
            await get_all_users_of_position_for_admin_controller(
                adminPosition,
            );
        if (!users.success) {
            return errorResponse(
                res,
                200,
                users.message || 'users not found',
            );
        }
        return successResponse(res, 202, users.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getUsersRouter;
