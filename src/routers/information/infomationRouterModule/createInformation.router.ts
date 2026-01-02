import { Request, Response, Router } from 'express';
import { create_information_controller } from '../../../controllers/information/information.controller';
// import { create_media_path } from '../../../middlewares/createTrainning.middleware';
import { create_media_path } from '../../../middlewares';
import { errorResponse, successResponse } from '../../../helpers';

const createInformationRouter: Router = Router();

createInformationRouter.post(
    '/',
    create_media_path,
    async (req: Request, res: Response) => {
        try {
            const { media_path, ...rest } = req.body;
            let value = { ...rest };

            if (media_path) {
                value.media = media_path;
            }
            const information = await create_information_controller(value);

            if (information?.success) {
                return successResponse(res, 201, information?.data);
            } else {
                return errorResponse(res, 400, information?.message || 'Failed to create information');
            }
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default createInformationRouter;
