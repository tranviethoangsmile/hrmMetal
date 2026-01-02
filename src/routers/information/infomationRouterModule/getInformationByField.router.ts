import { Request, Response, Router } from 'express';
import { search_all_information_with_field_controller } from '../../../controllers/information/information.controller';
import { errorResponse, successResponse } from '../../../helpers';

const searchAllRouter: Router = Router();

searchAllRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field = req.body.field;
        if (!field) {
            return errorResponse(res, 400, 'Missing field');
        } else {
            const informations = await search_all_information_with_field_controller(field);
            if (informations?.success) {
                return successResponse(res, 200, informations?.data);
            } else {
                return errorResponse(res, 400, informations?.message || 'Failed to search information');
            }
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default searchAllRouter;
