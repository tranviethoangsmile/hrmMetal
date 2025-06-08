import { Request, Response, NextFunction } from 'express';
import cloudinary from '../utils/cloudinary/cloudinary.config';
import { search_information_by_id_controller } from '../controllers/information/information.controller';
import { extractPublicId } from 'cloudinary-build-url';

const delete_media_url = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'value not valid',
            });
        }
        const information = await search_information_by_id_controller(id);
        if (!information?.success) {
            return res.status(404).json({
                success: false,
                message: 'Information not found',
            });
        }
        const publicId = extractPublicId(`${information?.data?.media}`);
        if (publicId) {
            const result = await cloudinary.v2.uploader.destroy(publicId);
            if (result.result === 'ok' || result.result === 'not found') {
                return next();
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'deleted not success',
                });
            }
        } else {
            // Không có media, vẫn cho phép xóa tiếp
            return next();
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
};
export default delete_media_url;
