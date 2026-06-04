import { Router, Request, Response } from "express";
import { get_all_checkins_of_position_in_date_for_admin_controller } from "../../../../controllers";
import { errorResponse, successResponse } from "../../../../helpers";
const getCheckinsRouter = Router();

getCheckinsRouter.post('/', async (req: Request, res: Response) => {
    try {
       const date: string | undefined = req.body.date
       const position: string | undefined = req?.user?.position
       if(!date || !position) {
        const missingFields = [
            !date && 'date',
            !position && 'position',
        ]
        .filter(Boolean)
        .join(', ');
        return errorResponse(res, 400, `Missing required ${missingFields}`);
       }
        const checkins = await get_all_checkins_of_position_in_date_for_admin_controller(position, date);
        if(!checkins.success) {
            return errorResponse(res, 200, checkins.message);
        }
        return successResponse(res, 202, checkins.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getCheckinsRouter;