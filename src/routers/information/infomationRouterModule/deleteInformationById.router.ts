import { Request, Response, Router } from 'express';
import { delete_information_by_id_controller } from '../../../controllers/information/information.controller';
import delete_media_url from '../../../middlewares/delete_media_url.middleware';
import { errorResponse, successResponse } from '../../../helpers';

const deleteInformation: Router = Router();

deleteInformation.post(
    '/',
    delete_media_url,
    async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.body?.id;
            if (!id) {
                return errorResponse(res, 400, 'Missing parameter: id');
            } else {
                const delete_result = await delete_information_by_id_controller(id);
                if (delete_result?.success) {
                    return successResponse(res, 200, undefined, 'Information deleted successfully');
                } else {
                    return errorResponse(res, 400, delete_result?.message || 'Failed to delete information');
                }
            }
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);
export default deleteInformation;
