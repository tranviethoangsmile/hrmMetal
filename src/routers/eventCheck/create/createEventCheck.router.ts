import { Request, Response, Router } from 'express';
import { create_event_check_controller } from '../../../controllers';
import { create_event_check_interface } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const createEvenCheck: Router = Router();

createEvenCheck.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_event_check_interface = req.body;
        if (!field || !field.event_id || !field.is_confirm || !field.user_id) {
            const missingFields = [
                !field.event_id && 'event_id',
                !field.is_confirm && 'is_confirm',
                !field.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const even_check = await create_event_check_controller(field);
        if (!even_check?.success) {
            return errorResponse(res, 400, even_check?.message || 'Failed to create event check');
        }
        return successResponse(res, 201, even_check?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default createEvenCheck;
