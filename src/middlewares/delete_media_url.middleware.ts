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
            res.status(400).json({
                success: false,
                message: 'value not valid',
            });
        } else {
            const information = await search_information_by_id_controller(id);
            if (information?.success) {
                const publicId = extractPublicId(`${information?.data?.media}`);
                if (publicId) {
                    const result = await cloudinary.v2.uploader.destroy(
                        publicId,
                    );
                    if (result.result === 'ok') {
                        return next();
                    } else {
                        res.status(200).json({
                            success: false,
                            message: 'deleted not success',
                        });
                    }
                } else {
                    return next();
                }
            }
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
};
export default delete_media_url;
