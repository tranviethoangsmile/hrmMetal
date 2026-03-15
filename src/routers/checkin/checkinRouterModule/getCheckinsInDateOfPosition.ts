import { Request, Response, Router } from 'express';
import { get_checkin_in_date_of_position_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
import { get_checkin_in_date_of_position_interface } from '../../../interfaces';
const getCheckinIndateOfPosition: Router = Router();

getCheckinIndateOfPosition.post('/', async (req: Request, res: Response) => {
    try {
        let field: get_checkin_in_date_of_position_interface = req.body;
        if(!field?.date || !field?.position) {
            const missingFields = [
                !field?.date && 'date',
                !field?.position && 'position',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing required ${missingFields}`);
        }
        const checkins = await get_checkin_in_date_of_position_controller(field);
        if (!checkins?.success) {
            return errorResponse(res, 200, checkins?.message);
        }
        return successResponse(res, 202, checkins?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getCheckinIndateOfPosition;
