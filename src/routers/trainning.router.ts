import { Request, Response, Router } from 'express';
import { create, get_all_trainning } from '../controllers/trainning.controller';
import { create_media_path } from '../middlewares/createTrainning.middleware';
import very_role from '../middlewares/veryRoleUpdate.middleware';
import TrainningRouter from './moduleTrainningRouter/trainning.router';
import multer from 'multer';

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
                res.status(201).json({
                    success: true,
                    data: new_media?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: new_media.message,
                });
            }
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'server error: ' + error.message,
            });
        }
    },
);

trainningRouter.get('/', async (req: Request, res: Response) => {
    try {
        const trainnings = await get_all_trainning();
        if (trainnings?.success) {
            res.status(201).json({
                success: true,
                data: trainnings?.data,
            });
        } else {
            res.status(200).json({
                success: false,
                message: trainnings.message,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
});

trainningRouter.use('/search', TrainningRouter);

export default trainningRouter;
