import { Request, Response, Router } from 'express';
import { create_information_controller } from '../../../controllers/information/information.controller';
// import { create_media_path } from '../../../middlewares/createTrainning.middleware';
import { create_media_path } from '../../../middlewares';

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
                return res.status(201).json({
                    success: true,
                    data: information?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: information?.message,
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Server error: ' + error?.message,
            });
        }
    },
);

export default createInformationRouter;
