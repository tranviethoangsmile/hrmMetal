import { Request, Response, Router } from 'express';
import { create_safety_check_controller } from '../../../controllers';
import { create_safety_check_interface } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const createSafetyCheckRouter: Router = Router();

createSafetyCheckRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_safety_check_interface = req.body;
        if (
            !field ||
            !field.event_id ||
            !field.is_at_home ||
            !field.is_can_work ||
            !field.user_id ||
            !field.is_safety
        ) {
            const missingFields = [
                !field.event_id && 'event_id',
                !field.is_at_home && 'is_at_home',
                !field.is_can_work && 'is_can_work',
                !field.user_id && 'user_id',
                !field.is_safety && 'is_safety',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Bad request: Missing required ${missingFields}`);
        }

        const create_safety_check = await create_safety_check_controller(field);
        if (!create_safety_check?.success) {
            return errorResponse(res, 200, create_safety_check?.message || 'Failed to create safety check');
        }
        return successResponse(res, 201, create_safety_check?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createSafetyCheckRouter;
