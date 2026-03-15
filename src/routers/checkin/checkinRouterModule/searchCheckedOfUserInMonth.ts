import { Request, Response, Router } from 'express';
import { search_checked_of_user_in_month_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
import { is_Checked_interface } from '../../../interfaces';
const checkinSearchRouter = Router();

checkinSearchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: is_Checked_interface = req.body;
        if(!field?.user_id || !field?.date) {
            const missingFields = [
                !field?.user_id && 'user_id',
                !field?.date && 'date',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing required ${missingFields}`);
        }
        const checked_value = await search_checked_of_user_in_month_controller(field);
        if (!checked_value?.success) {
            return successResponse(res, 200, checked_value?.data);
        } 
        return successResponse(res, 202, checked_value?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default checkinSearchRouter;
