import { Request, Response, Router } from 'express';
const uploadAvatar: Router = Router();
import { create_media_path } from '../../../middlewares';
import { update } from '../../../controllers/user/user.controller';

uploadAvatar.post(
    '/',
    create_media_path,
    async (req: Request, res: Response) => {
        const user_field = {
            id: req.body.id,
            avatar: req.body.media_path,
        };
        try {
            const result = await update(user_field);
            if (result?.success) {
                res.status(201).send({
                    success: true,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: result?.message,
                });
            }
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: 'server error: ' + error.mesage,
            });
        }
    },
);

export default uploadAvatar;
