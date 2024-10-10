import { Request, Response, Router } from 'express';
import { create_media_path } from '../../../middlewares';

const createMessageRouter: Router = Router();

createMessageRouter.post(
    '/',
    create_media_path, // Middleware để xử lý upload media
    async (req: Request, res: Response) => {
        try {
            const { media_path } = req.body;
            console.log(media_path);
            // Kiểm tra nếu media_path không tồn tại hoặc là chuỗi rỗng
            if (!media_path || media_path.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'media_path not available',
                });
            }

            // Trả về media_path
            return res.status(201).json({
                success: true,
                data: media_path,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'server error: ' + error?.message,
            });
        }
    },
);

export default createMessageRouter;
