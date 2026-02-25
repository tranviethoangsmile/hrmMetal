import { Request, Response, Router } from 'express';
import { get_checkin_detail_in_date_of_user_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
import { is_Checked_interface } from '../../../interfaces';
const checkinDetailRouter: Router = Router();

checkinDetailRouter.post('/', async (req: Request, res: Response) => {
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
        const checkin_detail = await get_checkin_detail_in_date_of_user_controller(field);
        if (!checkin_detail?.success) {
            return errorResponse(res, 200, checkin_detail?.message);
        } 
        return successResponse(res, 202, checkin_detail?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default checkinDetailRouter;
