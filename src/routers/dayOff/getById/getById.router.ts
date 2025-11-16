import { Request, Response, Router } from 'express';
import { get_day_off_by_id_controller } from '../../../controllers/dayOff/dayOff.controller';
import { errorResponse, successResponse } from '../../../helpers';

const getByIdRouter: Router = Router();

getByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id || id === '' || typeof id !== 'string') {
            return errorResponse(res, 400, 'ID is required and must be a non-empty string');
        }
        const dayOff = await get_day_off_by_id_controller(id);
        if (!dayOff?.success) {
            return errorResponse(res, 404, dayOff?.message || 'Day off not found');
        }
        return successResponse(res, 200, dayOff.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getByIdRouter;
