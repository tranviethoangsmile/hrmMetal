import { Router, Request, Response } from 'express';
import { findByName } from '../../../controllers';
import { IFindByName } from '../../../interfaces/user/user.interface';
import { errorResponse, successResponse } from '../../../helpers';

const userFindByNameRouter: Router = Router();

userFindByNameRouter.post('', async (req: Request, res: Response) => {
    try {
        const name: IFindByName | undefined = req.body.name;
        if (!name) {
            return errorResponse(res, 400, 'Name is required');
        }
        const users = await findByName(name);
        if (!users?.success) {
            return errorResponse(res, 400, users?.message || 'Failed to find users');
        }
        return successResponse(res, 200, users?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default userFindByNameRouter;
