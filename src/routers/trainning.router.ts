import express, { Request, Response, Router } from 'express';
import { create } from '../controllers/trainning.controller';
import { create_media_path } from '../middlewares/createTrainning.middleware';
import multer from 'multer';

const trainingRouter: Router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/media/uploads/');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });
trainingRouter.post(
    '/',
    upload.array('media'),
    create_media_path,
    async (req: Request, res: Response) => {
        try {
            const media = req.body;
            const new_media = await create(media);
            if (new_media.success) {
                res.status(200).json({
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
                message: 'server error: ' + error.mesage,
            });
        }
    },
);

export default trainingRouter;
