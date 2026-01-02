import { Request, Response, Router } from 'express';
import { search_information_by_id_controller } from '../../../controllers/information/information.controller';
import { errorResponse, successResponse } from '../../../helpers';

const getInformationByIdRouter: Router = Router();

getInformationByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body?.id;
        if (!id) {
            return errorResponse(res, 400, 'Missing parameter: id');
        } else {
            const information = await search_information_by_id_controller(id);
            if (!information?.success) {
                return errorResponse(res, 404, information?.message || 'Information not found');
            } else {
                return successResponse(res, 200, information?.data);
            }
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getInformationByIdRouter;
