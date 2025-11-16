import { Request, Response, Router } from 'express';
import { get_checkin_detail_in_date_of_user_controller } from '../../../controllers/checkin/checkin.controller';
import { errorResponse, successResponse } from '../../../helpers';

const checkinDetailRouter: Router = Router();

checkinDetailRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | undefined = req.body;
        if (field != undefined) {
            const checkin_detail = await get_checkin_detail_in_date_of_user_controller(field);
            if (checkin_detail?.success) {
                return successResponse(res, 200, checkin_detail?.data);
            } else {
                return errorResponse(res, 400, checkin_detail?.message || 'Failed to get checkin detail');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default checkinDetailRouter;
