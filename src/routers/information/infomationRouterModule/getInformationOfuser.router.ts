import { Request, Response, Router } from 'express';
import { search_information_user_controller } from '../../../controllers/information/information.controller';
import { errorResponse, successResponse } from '../../../helpers';

const getInforOfUserRouter: Router = Router();

getInforOfUserRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user_id: string | undefined = req.body?.user_id;
        if (!user_id) {
            return errorResponse(res, 400, 'Missing parameter: user_id');
        } else {
            const informations = await search_information_user_controller(user_id);
            if (informations?.success) {
                return successResponse(res, 200, informations?.data);
            } else {
                return errorResponse(res, 400, informations?.message || 'Failed to get information');
            }
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getInforOfUserRouter;
