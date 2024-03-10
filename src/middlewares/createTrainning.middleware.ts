import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const ENV = process.env;
cloudinary.v2.config({
    cloud_name: ENV.CLOUD_DINARY_NAME,
    api_key: ENV.API_KEY_CLOUD_DINARY,
    api_secret: ENV.API_SECRET_CLOUD_DINARY,
});
const create_media_path = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const file = req.file as Express.Multer.File;
        if (!file) {
            return res
                .status(400)
                .json({ success: false, message: 'No file uploaded' });
        }
        const result = await cloudinary.v2.uploader.upload(file.path, {
            resource_type: 'auto',
        });
        fs.unlink(file.path, () => {
            console.log('deleted path');
        });
        req.body.avatar = result.secure_url;
        next();
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
};

export { create_media_path };
