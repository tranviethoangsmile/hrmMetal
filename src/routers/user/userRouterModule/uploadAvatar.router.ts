import { Request, Response, Router } from 'express';
import { create_media_path } from '../../../middlewares';
import { update } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
import { IUploadAvatar } from '../../../interfaces';
const uploadAvatar: Router = Router();

uploadAvatar.post(
    '/',
    create_media_path,
    async (req: Request, res: Response) => {
        try {
        const user_field: IUploadAvatar = {
            id: req.body.id,
            avatar: req.body.media_path,
        };
        if(!user_field?.avatar || !user_field?.id){
            const missingField =[
                !user_field?.avatar && 'avatar',
                !user_field?.id && 'user_id'
            ].filter(Boolean)
            .join(', ')
            return errorResponse(res, 400, `bad request without ${missingField}`)
        }
        const result = await update(user_field);
            if (!result?.success) {
                return errorResponse(res, 200, result?.message || 'Failed to upload avatar');
            } 
            return successResponse(res, 202);   
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default uploadAvatar;
