import { Router, Request, Response } from 'express';
import { getAllUserCheckedSafetyCheckEventController } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const getAllUserCheckedSafetyCheckEventRouter: Router = Router();

getAllUserCheckedSafetyCheckEventRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const id: string = req.body.id;
            if (!id) {
                return errorResponse(res, 400, 'id is required');
            }
            const result = await getAllUserCheckedSafetyCheckEventController(id);
            if (!result?.success) {
                return errorResponse(res, 400, result?.message || 'Failed to get users checked safety check event');
            }
            return successResponse(res, 200, result?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default getAllUserCheckedSafetyCheckEventRouter;
