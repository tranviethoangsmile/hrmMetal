import { Request, Response, Router } from 'express';
const uploadAvatar: Router = Router();
import { create_media_path } from '../../../middlewares';
import { update } from '../../../controllers/user/user.controller';
import { errorResponse, successResponse } from '../../../helpers';

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
                return successResponse(res, 201, undefined, 'Avatar uploaded successfully');
            } else {
                return errorResponse(res, 400, result?.message || 'Failed to upload avatar');
            }
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default uploadAvatar;
