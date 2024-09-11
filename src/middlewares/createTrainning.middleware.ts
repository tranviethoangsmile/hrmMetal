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
            return next();
        }

        const result = await cloudinary.v2.uploader.upload(file.path, {
            resource_type: 'auto', // Adjust resource_type if needed
        });

        if (!result || !result.secure_url) {
            return res
                .status(400)
                .json({ success: false, message: 'Failed to upload media' });
        }
        fs.unlink(file.path, err => {
            if (err) console.error('Failed to delete file:', err);
            else console.log('File deleted successfully');
        });

        req.body.media_url = result.secure_url;
        next();
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message,
        });
    }
};

export { create_media_path };
