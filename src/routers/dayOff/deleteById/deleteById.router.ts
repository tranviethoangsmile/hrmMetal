import { Request, Response, Router } from 'express';
import { delete_day_off_by_id_controller } from '../../../controllers/dayOff/dayOff.controller';
import { errorResponse, successResponse } from '../../../helpers';

const deleteByIdRouter: Router = Router();

deleteByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id || typeof id !== 'string' || id.trim() === '') {
            return errorResponse(res, 400, 'ID is required and must be a non-empty string');
        }
        const isDeleted = await delete_day_off_by_id_controller(id);
        if (!isDeleted?.success) {
            return errorResponse(res, 404, `Day off with ID ${id} not found`);
        }
        return successResponse(res, 200, undefined, 'Day off deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default deleteByIdRouter;
