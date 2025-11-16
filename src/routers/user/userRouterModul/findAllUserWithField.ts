import { Request, Response, Router } from 'express';
import { findAllUserWithFieldControll } from '../../../controllers/user/user.controller';
import { errorResponse, successResponse } from '../../../helpers';

const findUser: Router = Router();

findUser.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const users = await findAllUserWithFieldControll(field);
            if (users?.success) {
                return successResponse(res, 200, users?.data);
            } else {
                return errorResponse(res, 400, users?.message || 'Failed to find users');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default findUser;
