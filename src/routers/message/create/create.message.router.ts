import { Request, Response, Router } from 'express';
import { create_media_path } from '../../../middlewares';
import { errorResponse, successResponse } from '../../../helpers';

const createMessageRouter: Router = Router();

createMessageRouter.post(
    '/',
    create_media_path, // Middleware để xử lý upload media
    async (req: Request, res: Response) => {
        try {
            const { media_path } = req.body;
            if (!media_path || media_path.trim() === '') {
                return errorResponse(res, 400, 'media_path is required');
            }
            return successResponse(res, 201, media_path);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default createMessageRouter;
