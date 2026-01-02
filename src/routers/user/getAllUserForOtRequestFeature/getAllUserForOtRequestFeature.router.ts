import { Router, Request, Response } from 'express';
import { getAllUserForOtRequestFeatureControll } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getAllUserForOtRequestFeatureRouter: Router = Router();

getAllUserForOtRequestFeatureRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const id: string = req.body.id;
            if (!id) {
                return errorResponse(res, 400, 'id is required');
            }
            const users = await getAllUserForOtRequestFeatureControll(id);
            if (users?.success) {
                return successResponse(res, 200, users?.data);
            } else {
                return errorResponse(res, 400, users?.message || 'Failed to get users');
            }
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default getAllUserForOtRequestFeatureRouter;
