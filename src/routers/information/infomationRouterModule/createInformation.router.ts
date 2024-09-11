import { Request, Response, Router } from 'express';
import { create_information_controller } from '../../../controllers/information/information.controller';
import { create_media_path } from '../../../middlewares/createTrainning.middleware';
import { upload } from '../../../utils/multer/upload.multer';

const createInformationRouter: Router = Router();

createInformationRouter.post(
    '/',
    upload.single('media'),
    create_media_path,
    async (req: Request, res: Response) => {
        try {
            const { media_url, ...rest } = req.body;
            let value = { ...rest };

            if (media_url) {
                value.media = media_url;
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
