import { Request, Response, NextFunction } from 'express';
import cloudinary from '../utils/cloudinary/cloudinary.config';
import fs from 'fs';

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
