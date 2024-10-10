import { Request, Response, NextFunction } from 'express';
import cloudinary from '../utils/cloudinary/cloudinary.config';
import busboy from 'busboy';
import { Readable } from 'stream';

const create_media_path = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const bb = busboy({ headers: req.headers });
        const urlMedias: string[] = [];
        const uploadPromises: Promise<void>[] = []; // Mảng chứa các Promise cho upload

        bb.on(
            'file',
            (
                fieldname: string,
                file: Readable,
                filename: string,
                encoding: string,
                mimetype: string,
            ) => {
                const uploadPromise = new Promise<void>((resolve, reject) => {
                    const cloudinaryStream =
                        cloudinary.v2.uploader.upload_stream(
                            { resource_type: 'auto' },
                            (err, result) => {
                                if (err) {
                                    return reject(
                                        res.status(200).json({
                                            success: false,
                                            message: `update media err -- ${err?.message}`,
                                        }),
                                    );
                                }
                                if (result) {
                                    urlMedias.push(result.secure_url);
                                }
                                resolve();
                            },
                        );
                    file.pipe(cloudinaryStream);
                });
                uploadPromises.push(uploadPromise);
            },
        );
        bb.on('field', (fieldname, val) => {
            req.body[fieldname] = val; // Cập nhật req.body với các trường dữ liệu
        });
        bb.on('finish', async () => {
            await Promise.all(uploadPromises);
            req.body = {
                ...req.body,
                media_path: urlMedias.join(','),
            };
            next();
        });

        req.pipe(bb); // Pipe request vào busboy
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
};

export { create_media_path };
