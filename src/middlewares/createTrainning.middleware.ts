import e, { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const ENV = process.env;
cloudinary.v2.config({
    cloud_name: ENV.CLOUD_NAME,
    api_key: ENV.API_KEY_CLOUD,
    api_secret: ENV.API_SECRET_CLOUD,
});
const create_media_path = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const files = req.files as Express.Multer.File[];
        const urlMedias: any[] = [];
        const uploadPromises = files.map(async (file: any) => {
            const result = await cloudinary.v2.uploader.upload(file.path, {
                resource_type: 'auto',
            });
            fs.unlink(file.path, () => {
                console.log('deleted path');
            });
            return result;
        });
        Promise.all(uploadPromises)
            .then(results => {
                const urls = results.map(result => result.secure_url);
                urlMedias.push(urls);
                req.body.media_path = urlMedias;
                req.body.user_id = 'b33c18b6-5ca6-4ce8-8178-6f03ababcefd';
                next();
            })
            .catch(error => {
                res.status(203).json({
                    success: false,
                    message: error?.message,
                });
            });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
};

export { create_media_path };
