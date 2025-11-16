import { Request, Response, Router } from 'express';
import {
    create,
    get_all_trainning,
} from '../../controllers/trainning/trainning.controller';
import { create_media_path } from '../../middlewares/createTrainning.middleware';
import very_role from '../../middlewares/veryRoleUpdate.middleware';
import TrainningRouter from './moduleTrainningRouter/trainning.router';
import multer from 'multer';
import { errorResponse, successResponse } from '../../helpers';

const trainningRouter: Router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/media/uploads/');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });
trainningRouter.post(
    '/',
    upload.array('media'),
    create_media_path,
    very_role,
    async (req: Request, res: Response) => {
        try {
            const media = req.body;
            const new_media = await create(media);
            if (new_media.success) {
                return successResponse(res, 201, new_media?.data);
            } else {
                return errorResponse(res, 400, new_media?.message || 'Failed to create training');
            }
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

trainningRouter.get('/', async (req: Request, res: Response) => {
    try {
        const trainnings = await get_all_trainning();
        if (trainnings?.success) {
            return successResponse(res, 200, trainnings?.data);
        } else {
            return errorResponse(res, 400, trainnings?.message || 'Failed to get trainings');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

trainningRouter.use('/search', TrainningRouter);

export default trainningRouter;
