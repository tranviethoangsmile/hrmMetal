import { Request, Response, Router } from 'express';
import { get_checkin_in_date_of_position_controller } from '../../../controllers/checkin/checkin.controller';
import { errorResponse, successResponse } from '../../../helpers';

const getCheckinIndateOfPosition: Router = Router();

getCheckinIndateOfPosition.post('/', async (req: Request, res: Response) => {
    try {
        let field: object | null = req.body;
        if (field != null) {
            const result = await get_checkin_in_date_of_position_controller(field);
            if (result?.success) {
                return successResponse(res, 200, result?.data);
            } else {
                return errorResponse(res, 400, result?.message || 'Failed to get checkins');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getCheckinIndateOfPosition;
